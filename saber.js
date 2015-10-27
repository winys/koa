//Saber.js

var cofs = require('co-fs'),
	fs = require('fs'),
	util = require("util"),
	crypto = require('crypto'),
	_config = {};

module.exports =  function (uconf){
	if ( fs.existsSync(uconf["config_path"]) ){
		_config = require(uconf["config_path"]);
	}
	if ( fs.existsSync(uconf["function_path"]) ){
		var fn =  require(uconf["function_path"]);
		for (var key in fn){
			if($.isFunction(fn[key])){
				$[key] = fn[key];
			}
		}
	}
}

global.saber = global.$ = {
	config : function (key, value) {
		if(arguments.length === 0)
			return _config;
		if( key === null){
			_config = {};
			return;
		}
		if( key && value ){
			_config[key] = value;
			return;
		}
		//支持批量设置配置项
		if( typeof key == "object" ){
			for(var name in key){
				_config[name] = key[name];
			}
			return;
		}
		return _config[key];
	},
	extend : function(){
		var args = [].slice.call(arguments);
		var deep = true;
		var target = args.shift();
		if ( typeof target == "boolean" ) {
			deep = target;
			target = args.shift();
		}
		target = target || {};
		var length = args.length;
		var options, name, src, copy, copyAsArray, clone;
		for(var i = 0; i < length; i++){
			options = args[i] || {};
			for(name in options){
				src = target[name];
				copy = options[name];
				if (src && src === copy) {
					continue;
				}
				if (deep && copy && ( $.isObject(copy) || (copyAsArray = $.isArray(copy) ))) {
					if (copyAsArray) {
						copyAsArray = false;
						clone = [];
					}else{
						clone = src && $.isObject(src) ? src : {}; 
					}
					target[name] = $.extend(deep, clone, copy);
				}else{
					target[name] = copy;
				}
			}
		}
		return target;
	},
	//判断是否为空
	isEmpty : function(obj){
		var type = toString.call(obj);	
		switch (type) {
			case '[object Object]' :
				for( var key in obj ){
					return false;
				}
				return true;
			case '[object Array]' :
				return obj.length === 0;
			case '[object String]' :
				return obj.length === 0;
			case '[object Null]' :
				return true;
			case '[object Undefined]' :
				return true;
			case '[object Boolean]' :
				return !obj;
			default :
				return false;
		}
	},
	//类型判断
	isBuffer : Buffer.isBuffer,
	isArray : Array.isArray,
	isString : function(obj){
		return toString.call(obj) === '[object String]';
	},
	isFunction : function ( fn ) {
		return toString.call(fn) == "[object Function]";
	},
	isObject : function (obj) {
		if ( $.isBuffer(obj) ){
			return false;
		}
		return toString.call(obj) === '[object Object]';
	},
	isGenerator : function (obj) {
		return toString.call(obj) === '[object Generator]';
	},
	isDate : util.isDate,
	isFile : function *( path ){
		if (yield cofs.exists(path) ) {
			return false;
		}
		var stats = yield cofs.stat(p);
		return stats.isFile();
	},
	isDir : function *( p ){
		if (!(yield cofs.exists(p)) ) {
			return false;
		}
		var stats = yield cofs.stat(p);
		return stats.isDirectory();
	},
	//生成GUID
	guid : function(length){
		'use strict';
		var ratio = Math.log(64) / Math.log(256);
		var numbytes = Math.ceil(length * ratio);
		var str = crypto.randomBytes(numbytes).toString('base64').slice(0, length);
		return str.replace(/\+/g, '_').replace(/\//g, '-');
	}
}
