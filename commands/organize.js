const fs = require('fs')
const path = require('path')

let types = {  //object containing grouping
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};


function organizeFn(dirpath){ //pass path - here that of test folder
    let destPath

    //invalid path 
    if(dirpath==undefined){ // -- no path given
        console.log("Please enter a valid directory path ")
        return;
    }
    else{ 
        let doesExist = fs.existsSync(dirpath) // -- path given but does'nt exist - PASS PATH IN QUOTES IN INPUT
        if (doesExist==true){
            destPath = path.join(dirpath,'organised_files') //to make path for new folder

            //but we have to check if is a folder of same name already exist 
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath) //since it does'nt exist make a folder now
            }
            else{
                console.log('This folder already exists')
            }
        }
        else{
            console.log("Folder does not exist, please enter a valid path")
            return;
        }
    }

    organiseHelper(dirpath , destPath) //calling func
    
}


function organiseHelper(src , dest){
    let childNames = fs.readdirSync(src) //get all files/folders inside src folder 
    console.log(childNames)

    //making full path for all contents of folder
    for(let i=0; i<childNames.length; i++){
        let childAddress = path.join(src , childNames[i])
        //filtering only files from content which may have folders too as we only need to sort files
        let isFile = fs.lstatSync(childAddress).isFile()
        // console.log(childAddress + " "  +isFile)

        if(isFile==true){
            let fileCategory = getCategory(childNames[i]) //a function that'l give category of file depending on extension
            console.log(childNames[i] + " belongs to " + fileCategory)
            sendFiles(childAddress, dest, fileCategory)
        }
    }
}

//getting category of file
function getCategory(name){
    let ext = path.extname(name) //this will have '.' so slice from 1 (ex .txt becomes txt)
    
    ext = ext.slice(1)

    for(let type in types){ //types is our object
        let cTypeArr = types[type] //get all arrays one by one and search in them to match extension
        for(let i=0; i<cTypeArr.length; i++){
            if (ext == cTypeArr[i]){
                return type; //return key which is basically folder category 
            }
        }
    }
    return 'others'; //in case no type matches

}

function sendFiles(srcFilePath, dest, fileCategory){
    let catPath = path.join(dest,fileCategory)

    if(fs.existsSync(catPath)==false){ //If folder of that category does'nt exist already then make it first
        fs.mkdirSync(catPath)
    }

    //extracting file name from childAddress passed into srcFilePath
    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath,fileName)

    //copying files
    fs.copyFileSync(srcFilePath, destFilePath)
    //also remove earlier copies ie copies at source to avoid having multiple copies
    fs.unlinkSync(srcFilePath)

    console.log(fileName + " is copied to " + fileCategory)

    
}

module.exports={
    organizeKey : organizeFn
}