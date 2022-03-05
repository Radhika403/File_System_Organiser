/// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders


// const fs = require('fs')
// const path = require('path') - not required here require in modules only 

const helpModule = require('./commands/help')
const organizeModule = require('./commands/organize')
const treeModule = require('./commands/tree')

let inputArr = process.argv.slice(2)

// let types = {  //object containing grouping   -- not neede here declare in organise.js only
//     media: ["mp4", "mkv", "mp3"],
//     archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
//     documents: [
//       "docx",
//       "doc",
//       "pdf",
//       "xlsx",
//       "xls",
//       "odt",
//       "ods",
//       "odp",
//       "odg",
//       "odf",
//       "txt",
//       "ps",
//       "tex",
//     ],
//     app: ["exe", "dmg", "pkg", "deb"],
//   };

//node FO.js tree folderPath
//  0     1    2      3
// but when we slice node and FO.js removed so tree is 0 when inputing in command or directly input it at process.argv[2]

let command = inputArr[0]

// switch is used to make cases
switch(command){ //command we give input like tree, organise, help which are our cases

    case 'tree':
        // console.log('tree implemented')
        // treeFn(inputArr[1])
        treeModule.treeKey(inputArr[1])
        break;
    case 'organise':
        // console.log('organise implemented')
        organizeModule.organizeKey(inputArr[1]) 
        break;
    case 'help':
        // console.log('help implemented')
        helpModule.helpKey()
        break;
    default:
        console.log('Please enter a valid command')
        break;
}

// if command has a case that does'nt exist then code runs but nothing happens - for this add defualt case - runs when none of the cases match to command given
//now we'll add functions to these tree, organise, help to make project


//meanwhile make a test folder add a text file a mp3 file and a pdf file and other extension files to it -- this is our testCase
//pass any path of folder and then organize folder path is run on this folder -- here or testfolder 

