function createLocaleJsonTypeScriptDefinitionFiles(locales) {
	for (const locale of locales) {
		fs.writeFileSync(
			`./locale/${locale}.json.d.ts`,
			`
import { LabelKey } from '../index'
type Locale = { [key in LabelKey]: string }
declare const Locale: Locale
export default Locale
			`.trim()
		)
	}
}