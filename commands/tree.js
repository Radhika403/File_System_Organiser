const fs = require('fs')
const path = require('path')

function treeFn(dirpath){
    //invalid path 
    if(dirpath==undefined){ // -- no path given
        console.log("Please enter a valid directory path ")
        return;
    }
    else{ 
        let doesExist = fs.existsSync(dirpath) // -- path given but does'nt exist - PASS PATH IN QUOTES IN INPUT
        if (doesExist==true){
            treeHelper(dirpath , " ")
        }
        else{
            console.log("Folder does not exist, please enter a valid path")
            return;
        }
    }
    
}

function treeHelper(targetPath,indent){ //indent in file explorer --> child folder of a folder, we can use indent to get a folder inside a folder
    //we'll use recursion here
    let isFile = fs.lstatSync(targetPath).isFile() //file or foler

    //if its a file directly display name if its a folder go inside

    if(isFile==true){ //base case
        let fileName = path.basename(targetPath) //get name of file
        // is a symbol meaning include - it tells if file is included in particular folder - copy this it can't be typed from keyboard
        console.log(indent + "├──" + fileName)
    }
    else{
        let dirName = path.basename(targetPath)
        console.log(indent + "└──" + dirName) // this symbol is for folder - copy this it can't be typed from keyboard

        //for content inside folder
        let children = fs.readdirSync(targetPath)
        // console.log(children)
        
        //now going inside those folders too - recursion
        for(let i=0; i<children.length; i++){
            let childPath = path.join(targetPath,children[i])
            treeHelper(childPath,indent + '\t') //add tab to indent -- basically finding a file is our base case
        }
    }
}

module.exports={
    treeKey : treeFn
}
