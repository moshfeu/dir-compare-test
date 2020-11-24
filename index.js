const { compare } = require('dir-compare');
const path = require('path');

var options = {
  compareSize: false, // compare only name by disabling size and content criteria
  compareContent: false,
  compareNameHandler: customNameCompare, // new name comparator used to ignore extensions
  ignoreExtension: ['t', 'cc'], // supported by the custom name compare below
};

function extnameOnly(name) {
  return path.extname(name).replace('.', '');
}

function customNameCompare(name1, name2, options) {
    if (options.ignoreCase) {
      name1 = name1.toLowerCase();
      name2 = name2.toLowerCase();
  }
  if (options.ignoreExtension) {
      if (options.ignoreExtension.includes(extnameOnly(name1))) {
          name1 = path.basename(name1, path.extname(name1));
      }
      if (options.ignoreExtension.includes(extnameOnly(name2))) {
          name2 = path.basename(name2, path.extname(name2));
      }
  }
  const res = name1 === name2 ? 0 : name1 > name2 ? 1 : -1;
  return res;
}

var path1 = 'folder1';
var path2 = 'folder2';

compare(path1, path2, options).then((res) => {
  // console.log(`Same: ${res.same}`);
  if (!res.diffSet) {
    return;
  }
  console.log('RES:');
  res.diffSet.forEach((dif) =>
    console.log(`${dif.name1} ${dif.name2} ${dif.state}`)
  );
});
