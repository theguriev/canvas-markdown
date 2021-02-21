const path = require('path')
const { spawn } = require('child_process')
const copyDir = require('copy-dir')

const npx = spawn('npx', ['babel', 'src', '--out-dir', 'dist', '--ignore', 'node_modules,test,tests,temp,tmp,**/*.d.ts', '--delete-dir-on-start', '--extensions', '.js,.jsx,.ts,.tsx'])

npx.stdout.on('data', line => {
    if (!line.includes('Successfully')) return
    copyDir.sync(path.resolve(process.cwd(), 'src'), path.resolve(process.cwd(), 'dist'), {
        cover: false,
        mode: true,
        filter: (stat, filepath) => {
            if (stat === 'file') {
                if (filepath.endsWith('.d.ts')) {
                    return true
                }
                if (
                    filepath.endsWith('ts')
                    || filepath.endsWith('tsx')
                    || filepath.endsWith('js')
                    || filepath.endsWith('jsx')
                ) {
                    return false
                }
                return true
            }
            return true
        }
    })
    // eslint-disable-next-line no-console
    console.log(`👍🏻 ${line}`)
})
