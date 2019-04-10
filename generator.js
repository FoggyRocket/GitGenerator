const del = require(`del`);
const simpleGit = require(`simple-git/promise`);
var prompt = require(`prompt`)

const exercises = require('./exercises')

const MYUSER = `ta-web-mex`
const MYPASS = `Hy3>jL7b-ih`

const TRASH_PP = `./PP/`
const TRASH_DE = `./DE/`

const studentsUser = [
`tomasfranciscoar`,
`lockeas16`,
`rpernicone`,
`marianaLz`,
`dannbleu`,
`reyazucar777`,
`unrhs`,
`luisf89`,
`rafaeltorrese`,
`Tamy99`,
`JesusAlonsosan`,
`rociopmz`,
`dcarbajalc`
];

const getProject = (exercise, trash) => {
  studentsUser.forEach( user => {
    let REPO_SITE = `github.com/${user}${exercise}`
    let remote = `https://${MYUSER}:${MYPASS}@${REPO_SITE}`
    simpleGit()
      .silent(true)
      .clone(remote,`${trash}${user}`)
        .then(()  => console.log(`+ (✔) ➤ ${user}`))
        .catch(() => console.log(`- (✘) ➤ ${user}`))
  })
}



(async () => {
  prompt.start()

prompt.get(['module', 'day'], async (err, {module, day})=>{
    if(
      typeof(parseInt(module)) !== 'number' ||
      typeof(parseInt(day)) !== 'number' ||
      parseInt(module) > 3 ||
      parseInt(day) > 10
      ){
      console.error('seasmamon')
    }else{
      if(err === null){
        try{
          const paths = await del([`${TRASH_PP}`], {force: true})
          const pathss = await del([`${TRASH_DE}`], {force: true})
          const PP = exercises.module[module][day].PP
          const DE = exercises.module[module][day].DE
          if(paths && pathss) {
            console.log(`Pair Programming: ${PP}`)
            console.log(`Daily Exercise: ${DE}`)
            getProject(PP, TRASH_PP )
            getProject(DE, TRASH_DE )
          }
          return
        }catch(err){
          console.error(err)
        }
      }else{
        console.error(err)
      }
    }
})
})()

