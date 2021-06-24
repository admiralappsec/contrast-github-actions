//import modules from npm
const os = require('os');
const path = require('path');
const download = require('mvn-artifact-download');
const core = require('@actions/core');
const github = require('@actions/github');


//this function gets the OS platform a box is running on
const getPlatform = () => {
    try {
        let platformBox = os.platform();
    
        if (platformBox.includes(`win32`)) {
            //console.log(`this is a windows box`);
            return 'windows';
        }
        if (platformBox.includes(`linux`)) {
            //console.log(`this is a linux box`);
            return 'linux';
        } 
        if (platformBox.includes(`darwin`)) {
            //console.log(`this is a mac box`);
            return 'mac';
        }
    } catch {
        throw `this os type is not currently supported.  possible options are: aix, darwin, freebsd, linux, openbsd, sunos, win32.`
    }
}

//download a Contrast Security agent into a directory
const downloadContrastSecurity = ( platformType, agentType, customDownloadLocation, URL ) => {
    const incomingCustomDownloadLocation = customDownloadLocation;
    const incomingPlatformType = platformType;
    const incomingAgentType = agentType;
    const incomingURL = URL;
    let downloadLocation = "";

    //check if file already exists!
    try {
        if (customDownloadLocation != "") {
            console.log('custom download location was detected.  moving forward with string ' + incomingCustomDownloadLocation + '.');

            downloadLocation = customDownloadLocation;
        }

        if (customDownloadLocation == 'local') {
            console.log(`custom download located was detected as local.  Using current directory as download location.`);
            downloadLocation = process.cwd();
            console.log(`current working directory: ${downloadLocation}`);
        }

        if (customDownloadLocation == "") {
            console.log(`no custom download location was passed to the function.  moving forward with default file locations per platform type.`);

            if (incomingPlatformType == `mac`) {
                downloadLocation = process.cwd();
            }
        
            if (incomingPlatformType == `windows`) {
                downloadLocation = path.join(`/`, `C`, `Program Files`, `Contrast`, incomingAgentType);
            }
            if (incomingPlatformType == `linux`) {
                downloadLocation = path.join(`/`, `opt`, `contrast`);
            }
            
        }
        
        //check against incoming agent type == java
        if (incomingAgentType == `java`) {
            //download the artifact using the npm library
            download.default({
                groupId: `com.contrastsecurity`,
                artifactId: `contrast-agent`,
                //need to find the syntax to pass 'LATEST' version
                version: `3.8.4.20143`
            }, downloadLocation).then((results) => {console.log(`file was downloaded to: ${results}`)});

        }

        if (incomingAgentType == `dotnet-legacy`) {
            console.log(`coming soon.`);
        }

        if (incomingAgentType == `dotnet-core`) {
            console.log(`coming soon.`);
        }

        if (incomingAgentType == `python`) {
            console.log(`coming soon.`);
        }

        if (incomingAgentType == `golang`) {
            console.log(`coming soon.`);
        }

        if (incomingAgentType == `nodejs`) {
            console.log(`coming soon.`);
        }

        if (incomingAgentType == `ruby`) {
            console.log(`coming soon.`);
        }

    } catch(error) {
        //throw an error if there is one
        throw error;
    }
}

//main try-catch statement for github actions
try {
    const agentType = core.getInput(`agent-type`);
    console.log(`Agent type: ${agentType}`);
    
    const downloadLocation = core.getInput(`download-location`);
    console.log(`Download location: ${downloadLocation}`);

    const retrievedOSType = getPlatform();

    downloadContrastSecurity(retrievedOSType, agentType, downloadLocation, '' );

    const successMessage = `successfully downloaded Contrast Security ${agentType} agent in directory: ${downloadLocation}`;
    core.setOutput("success-message", successMessage);

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
