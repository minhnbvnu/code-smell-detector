async function extractContentFromFile (fileMsgElem, e) {
  logger.info('filename: ' + fileMsgElem.name)
  let fileType = isPureText(fileMsgElem.name)
  if (fileType) {
    // 可读的文件类型
    let fileUrl = fileMsgElem.url || (e.isGroup ? await e.group.getFileUrl(fileMsgElem.fid) : await e.friend.getFileUrl(fileMsgElem.fid))
    let filePath = await downloadFile(fileUrl, path.join('received', fileMsgElem.name))
    switch (fileType) {
      case 'pdf': {
        if (!pdfjsLib) {
          return {}
        }
        const data = new Uint8Array(fs.readFileSync(filePath))
        let loadingTask = pdfjsLib.getDocument(data)
        try {
          const pdfDocument = await loadingTask.promise
          const numPages = pdfDocument.numPages
          let pdfText = ''

          // limit pages to prevent OOM or LLM down
          let maxPage = 100
          // Iterate through each page and extract text
          for (let pageNum = 1; pageNum <= Math.min(numPages, maxPage); ++pageNum) {
            const page = await pdfDocument.getPage(pageNum)
            const textContent = await page.getTextContent()
            const pageText = textContent.items.map(item => item.str).join(' ')
            pdfText += pageText
          }

          return {
            content: pdfText,
            name: fileMsgElem.name
          }
        } catch (error) {
          console.error('Error reading PDF file:', error)
          return {}
        }
      }
      case 'doc': {
        logger.error('not supported file type now')
        return ''
      }
      case 'docx': {
        if (!mammoth) {
          return {}
        }
        try {
          const { value } = await mammoth.extractRawText({ path: filePath })
          return {
            content: value,
            name: fileMsgElem.name
          }
        } catch (error) {
          logger.error('Error reading .docx file:', error)
          return {}
        }
      }
      case 'xls': {
        logger.error('not supported file type now')
        return {}
      }
      case 'xlsx': {
        if (!XLSX) {
          return {}
        }
        try {
          const workbook = XLSX.readFile(filePath)
          const sheetName = workbook.SheetNames[0] // Assuming the first sheet is the one you want to read
          const sheet = workbook.Sheets[sheetName]
          const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })

          // Convert the 2D array to plain text
          return {
            content: data.map(row => row.join('\t')).join('\n'),
            name: fileMsgElem.name
          }
        } catch (error) {
          console.error('Error reading .xlsx file:', error)
          return {}
        }
      }
      case 'ppt': {
        logger.error('not supported file type now')
        return {}
      }
      case 'pptx': {
        if (!PPTX) {
          return {}
        }
        try {
          let pptx = new PPTX.Composer()
          await pptx.load(filePath)
          let presentationContent = []
          let slideNumber = 1
          let maxSlideNumber = 60
          while (slideNumber <= maxSlideNumber) {
            let slide
            try {
              slide = pptx.getSlide(slideNumber)
            } catch (error) {
              // Slide number out of range, break the loop
              break
            }

            let slideContent = []

            // Iterate through slide elements and extract text content
            slide.elements.forEach(element => {
              if (element.text) {
                slideContent.push(element.text)
              }
            })

            // Add slide content to the presentation content array
            presentationContent.push(slideContent.join('\n'))

            // Move to the next slide
            slideNumber++
          }
          return {
            content: presentationContent.join('\n'),
            name: fileMsgElem.name
          }
        } catch (error) {
          console.error('Error reading .pptx file:', error)
          return {}
        }
      }
      case 'epub': {
        logger.error('not supported file type now')
        return {}
      }
      default: {
        // text type
        const data = fs.readFileSync(filePath)
        let text = String(data)
        if (text) {
          return {
            content: text,
            name: fileMsgElem.name
          }
        }
      }
    }
    return {}
  }
}