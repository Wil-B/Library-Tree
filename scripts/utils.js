'use strict';

let my_utils = {}

my_utils.scriptInfo = window.ScriptInfo;
my_utils.packageInfo = utils.GetPackageInfo(my_utils.scriptInfo.PackageId);
my_utils.packagePath = `${my_utils.packageInfo.Directories.Root}/`;

my_utils.getAsset = assetFile => utils.ReadTextFile(`${my_utils.packageInfo.Directories.Assets}/${assetFile}`);
my_utils.getImageAssets = assetFolder => utils.Glob(`${my_utils.packageInfo.Directories.Assets}/images/${assetFolder}/*`);
my_utils.getScriptPath = `${my_utils.packageInfo.Directories.Scripts}/`;