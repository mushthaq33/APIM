#!/bin/bash

#Ask for the distribution source path
echo "Please enter the apim distribution source path"

read sourcePath

#Ask for the target path to extract the distribution pack
echo "Please enter the target path"

read targetPath

#Ask for the local carbon-apimgt path
echo "Please enter the carbon-apimgt path"

read carbonPath

#Extract the distribution into the target directory
unzip -d $targetPath $sourcePath

#Rename the existing publisher app
mv $targetPath/wso2am-3.0.0-SNAPSHOT/repository/deployment/server/jaggeryapps/publisher $targetPath/wso2am-3.0.0-SNAPSHOT/repository/deployment/server/jaggeryapps/publisher-back

#Rename the existing devportal app
mv $targetPath/wso2am-3.0.0-SNAPSHOT/repository/deployment/server/jaggeryapps/devportal $targetPath/wso2am-3.0.0-SNAPSHOT/repository/deployment/server/jaggeryapps/devportal-back

#Create a symlink for the publisher app
ln -s $carbonPath/features/apimgt/org.wso2.carbon.apimgt.publisher.feature/src/main/resources/publisher $targetPath/wso2am-3.0.0-SNAPSHOT/repository/deployment/server/jaggeryapps

#Create a symlink for the devportal app
ln -s $carbonPath/features/apimgt/org.wso2.carbon.apimgt.store.feature/src/main/resources/devportal $targetPath/wso2am-3.0.0-SNAPSHOT/repository/deployment/server/jaggeryapps


echo "Distribution is ready to use at $targetPath/wso2am-3.0.0-SNAPSHOT/bin"
