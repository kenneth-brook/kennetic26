import nunjucks from 'nunjucks'
import fsExtra from 'fs-extra'
import path from 'path'

const { copy, ensureDir, writeFile, readdir, stat } = fsExtra

const srcDir = path.resolve('src/pages')
const destDir = path.resolve('dist')
const includesDir = path.resolve('src/includes')

// Create and configure environment
const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader([srcDir, includesDir]),
  { autoescape: true }
)

// ---- Add filters ---- //
env.addFilter('date', function (input, format = 'Y') {
  const d = input === 'now' ? new Date() : new Date(input)
  if (isNaN(d.getTime())) return ''
  // Very simple formatter
  if (format === 'Y') return d.getFullYear()
  if (format === 'm/d/Y')
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
  return d.toISOString()
})
// --------------------- //

async function renderFile(filePath, relPath) {
  const outPath = path.join(destDir, relPath.replace(/\.njk$/, '.html'))
  const html = env.render(filePath.replace(srcDir + '/', ''), {
    year: new Date().getFullYear(),
    siteTitle: 'Kennetic Concepts'
  })
  await ensureDir(path.dirname(outPath))
  await writeFile(outPath, html)
  console.log('Rendered', relPath)
}

async function walk(dir, base = '') {
  const items = await readdir(dir)
  for (const item of items) {
    const full = path.join(dir, item)
    const rel = path.join(base, item)
    const info = await stat(full)
    if (info.isDirectory()) await walk(full, rel)
    else if (item.endsWith('.njk')) await renderFile(full, rel)
  }
}

await walk(srcDir)
await copy('src/assets', path.join(destDir, 'assets'))
await copy('src/img', path.join(destDir, 'img'))
console.log('✅ Nunjucks build complete')
