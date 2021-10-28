/**
 * 静态方法版
 */
// class Storage {
//   static getInstance () {
//     if (!Storage.instance) {
//       Storage.instance = new Storage()
//     }

//     return Storage.instance
//   }

//   getItem (key) {
//     return localStorage.getItem(key)
//   }

//   setItem (key, value) {
//     return localStorage.setItem(key, value)
//   }

//   removeItem(key) {
//     return localStorage.removeItem(key)
//   }

//   clear() {
//     return localStorage.clear()
//   }
// }

// use
// var storage = Storage.getInstance()
// storage.setItem('name', '李雷')

/**
 * 闭包版
 */
function StorageBase() {}

Storage.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}

Storage.prototype.removeItem = function (key) {
  return localStorage.removeItem(key)
}

Storage.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}

Storage.prototype.clear = function () {
  return localStorage.clear()
}

const Storage = (function() {
  let instance = null
  return function() {
    if (!instance) {
      instance = new StorageBase()
    }

    return instance
  }
})()


var storage = new Storage()
storage.setItem('name', 'liming')