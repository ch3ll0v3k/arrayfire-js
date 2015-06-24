"use strict";
"use strict";
var Bluebird = require("bluebird");
var _ = require("lodash");
function synchronify(fire, f) {
  return function() {
    var err;
    var res;
    var cb = function(e, r) {
      err = e;
      res = r;
      done = true;
    };
    var done = false;
    var args = _.toArray(arguments).concat(cb);
    f.apply(this, args);
    while (!done)
      fire._doEvents();
    if (err)
      throw err;
    return res;
  };
}
function installAsyncAndSync(fire, obj, name) {
  if (_.isUndefined(name)) {
    var $__3 = true;
    var $__4 = false;
    var $__5 = undefined;
    try {
      for (var $__1 = void 0,
          $__0 = (_.keys(obj))[$traceurRuntime.toProperty(Symbol.iterator)](); !($__3 = ($__1 = $__0.next()).done); $__3 = true) {
        var key = $__1.value;
        {
          installAsyncAndSync(fire, obj, key);
        }
      }
    } catch ($__6) {
      $__4 = true;
      $__5 = $__6;
    } finally {
      try {
        if (!$__3 && $__0.return != null) {
          $__0.return();
        }
      } finally {
        if ($__4) {
          throw $__5;
        }
      }
    }
    return;
  }
  var f = obj[name];
  if (_.isFunction(f)) {
    if (!_.isFunction(obj[name + "Async"])) {
      obj[name + "Async"] = function() {
        var self = this;
        var args = _.toArray(arguments);
        return new Bluebird(function(resolve, reject) {
          var cb = function(e, r) {
            if (e) {
              reject(e);
            } else {
              resolve(r);
            }
          };
          args.push(cb);
          f.apply(self, args);
        });
      };
    }
    obj[name + "Sync"] = synchronify(fire, f);
  }
}
function Ext(self) {
  installAsyncAndSync(self, self);
  installAsyncAndSync(self, self.AFArray);
  installAsyncAndSync(self, self.AFArray.prototype);
  _.extend(self, {
    end: -1,
    types: {
      dtype: require("./dtype"),
      dDype: require("./dtype"),
      source: require("./source")
    },
    Dim4: require("./dim4"),
    Seq: require("./seq"),
    Complex: require("./complex"),
    getDevices: function() {
      var current = this.getDevice();
      try {
        var count = this.getDeviceCount();
        var result = [];
        for (var i = 0; i < count; i++) {
          this.setDevice(i);
          var info = this.deviceInfo();
          info.id = i;
          result.push(info);
        }
        return result;
      } finally {
        this.setDevice(current);
      }
    }
  });
}
module.exports = Ext;
//# sourceMappingURL=data:application/json;base64,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LENBQUM7QUFBQSIsImZpbGUiOiJleHQuanMiLCJzb3VyY2VSb290IjoibGliL2VzNiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5Db3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgQXJyYXlGaXJlXG5Db3B5cmlnaHQgKGMpIDIwMTUgR++/vWJvciBNZXrvv70gYWthIHVuYm9ybmNoaWtrZW4gKGdhYm9yLm1lem9Ab3V0bG9vay5jb20pXG5BbGwgcmlnaHRzIHJlc2VydmVkLlxuXG5SZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXQgbW9kaWZpY2F0aW9uLFxuYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuXG4gKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbiAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xuICBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvbiBhbmQvb3JcbiAgb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuKiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBBcnJheUZpcmUgbm9yIHRoZSBuYW1lcyBvZiBpdHNcbiAgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb21cbiAgdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG5BTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRSBGT1JcbkFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OXG5BTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVNcblNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmxldCBCbHVlYmlyZCA9IHJlcXVpcmUoXCJibHVlYmlyZFwiKTtcbmxldCBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuZnVuY3Rpb24gc3luY2hyb25pZnkoZmlyZSwgZikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlcnI7XG4gICAgICAgIHZhciByZXM7XG4gICAgICAgIGxldCBjYiA9IGZ1bmN0aW9uIChlLCByKSB7XG4gICAgICAgICAgICBlcnIgPSBlO1xuICAgICAgICAgICAgcmVzID0gcjtcbiAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBkb25lID0gZmFsc2U7XG4gICAgICAgIGxldCBhcmdzID0gXy50b0FycmF5KGFyZ3VtZW50cykuY29uY2F0KGNiKTtcblxuICAgICAgICBmLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXG4gICAgICAgIHdoaWxlICghZG9uZSkgZmlyZS5fZG9FdmVudHMoKTtcblxuICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbGxBc3luY0FuZFN5bmMoZmlyZSwgb2JqLCBuYW1lKSB7XG4gICAgaWYgKF8uaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIF8ua2V5cyhvYmopKSB7XG4gICAgICAgICAgICBpbnN0YWxsQXN5bmNBbmRTeW5jKGZpcmUsIG9iaiwga2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGYgPSBvYmpbbmFtZV07XG4gICAgaWYgKF8uaXNGdW5jdGlvbihmKSkge1xuICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihvYmpbbmFtZSArIFwiQXN5bmNcIl0pKSB7XG4gICAgICAgICAgICBvYmpbbmFtZSArIFwiQXN5bmNcIl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzID0gXy50b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbHVlYmlyZChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjYiA9IGZ1bmN0aW9uIChlLCByKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChjYik7XG4gICAgICAgICAgICAgICAgICAgIGYuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIG9ialtuYW1lICsgXCJTeW5jXCJdID0gc3luY2hyb25pZnkoZmlyZSwgZik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBFeHQoc2VsZikge1xuXG4gICAgaW5zdGFsbEFzeW5jQW5kU3luYyhzZWxmLCBzZWxmKTtcbiAgICBpbnN0YWxsQXN5bmNBbmRTeW5jKHNlbGYsIHNlbGYuQUZBcnJheSk7XG4gICAgaW5zdGFsbEFzeW5jQW5kU3luYyhzZWxmLCBzZWxmLkFGQXJyYXkucHJvdG90eXBlKTtcblxuICAgIF8uZXh0ZW5kKHNlbGYsIHtcbiAgICAgICAgZW5kOiAtMSxcbiAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgIGR0eXBlOiByZXF1aXJlKFwiLi9kdHlwZVwiKSxcbiAgICAgICAgICAgIGREeXBlOiByZXF1aXJlKFwiLi9kdHlwZVwiKSxcbiAgICAgICAgICAgIHNvdXJjZTogcmVxdWlyZShcIi4vc291cmNlXCIpXG4gICAgICAgIH0sXG4gICAgICAgIERpbTQ6IHJlcXVpcmUoXCIuL2RpbTRcIiksXG4gICAgICAgIFNlcTogcmVxdWlyZShcIi4vc2VxXCIpLFxuICAgICAgICBDb21wbGV4OiByZXF1aXJlKFwiLi9jb21wbGV4XCIpLFxuICAgICAgICBnZXREZXZpY2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuZ2V0RGV2aWNlKCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMuZ2V0RGV2aWNlQ291bnQoKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGV2aWNlKGkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZGV2aWNlSW5mbygpO1xuICAgICAgICAgICAgICAgICAgICBpbmZvLmlkID0gaTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERldmljZShjdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV4dDsiXX0=