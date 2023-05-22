const { exec } = require('child_process');
require('dotenv').config();

export default function handler(req, res) {
    let rows;
    
    const gitRepoPath = '../repositories/testRepository';
    var commitBStatus = 'false';

    // Execute the Git command to get the list of modified files
    exec(`git --git-dir=${gitRepoPath}/.git --work-tree=${gitRepoPath} status --porcelain`, (error, stdout, stderr) => {
        if (error) {
        console.error(`exec error: ${error}`);
        //console.log(error);
        //const errorArray = error.split('\n');
        //const splitedError = errorArray[2].split(': ');
        res.status(200).json({
            error: error,
            modifiedFiles: [],
            addedFiles: [],
            deletedFiles: [],
            commitBStatus: false,
        });
        return;
        }
        //console.log(stdout);
        // Split the output into an array of file changes
        const fileChanges = stdout.trim().split('\n');
    
        // Filter the list of file changes to only include modifications, additions, and deletions
        
        //console.log(fileChanges);
        
        let modifiedFiles = fileChanges
        .filter(change => change.startsWith(' M '))
        .map(change => change.substring(2));

        modifiedFiles.unshift(fileChanges
            .filter(change => change.startsWith('M '))
            .map(change => change.substring(2))
        );
    
        let addedFiles = fileChanges
        .filter(change => change.startsWith('?? '))
        .map(change => change.substring(2));

        let deletedFiles = fileChanges
        .filter(change => change.startsWith(' D '))
        .map(change => change.substring(2));

        deletedFiles.unshift(fileChanges
            .filter(change => change.startsWith('D '))
            .map(change => change.substring(2))
        );
        
        if(modifiedFiles[0] != undefined){
            if(modifiedFiles[0][0] === undefined){
                modifiedFiles = [];
            }
        }
        if(addedFiles[0] != undefined){
            if(addedFiles[0][0] === undefined){
                addedFiles = [];
            }
            
        }
        if(deletedFiles[0] != undefined){
            if(deletedFiles[0][0] === undefined){
                deletedFiles = [];
            }
            
        }
        if(modifiedFiles[0] === undefined && addedFiles[0] === undefined && deletedFiles[0] === undefined){
            commitBStatus = 'true';
        }
        exec(`git --git-dir=${gitRepoPath}/.git --work-tree=${gitRepoPath} branch --show-current`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                res.status(200).json({
                    modifiedFiles: modifiedFiles,
                    addedFiles: addedFiles,
                    deletedFiles: deletedFiles,
                    commitBStatus: commitBStatus,
                    brench: 'erro'
                });
                return;
            }else{
                //console.log(stdout)
                const brench = stdout.trim().split('\n');
                //console.log(brench[0]);

                res.status(200).json({
                    modifiedFiles: modifiedFiles,
                    addedFiles: addedFiles,
                    deletedFiles: deletedFiles,
                    commitBStatus: commitBStatus,
                    brench: brench  
                });
            }

        });
        
    });//*/
}
