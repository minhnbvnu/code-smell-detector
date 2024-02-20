async function processUser (user) {
      open++
      console.log(`Backing up user: ${user.Username}`)

      const options = { UserPoolId: userPoolId, Username: user.Username }
      let isAdmin = false
      let isRegistered = false

      console.log(`Enumerating groups for user: ${user.Username}`)
      do {
        const resp = await cognitoIdp.adminListGroupsForUser(options).promise()
        options.NextToken = resp.NextToken

        for (const group of resp.Groups) {
          if (group.GroupName === adminsGroup) {
            isAdmin = true
          } else if (group.GroupName === registeredGroup) {
            isRegistered = true
          }
        }
      } while (options.NextToken != null)

      console.log(`Serializing attributes for user: ${user.Username}`)
      // Only serialize what's needed, to save space and speed up restoration.
      // (Restoration is more network-intensive than backup.)
      const attributes = Object.create(null)

      for (const attr of user.Attributes) {
        attributes[attr.Name] = attr.Value
      }

      attributes.email = user.Username
      attributes._isAdmin = isAdmin
      attributes._isRegistered = isRegistered

      console.log(`Writing user: ${user.Username}`)
      write(attributes)
    }