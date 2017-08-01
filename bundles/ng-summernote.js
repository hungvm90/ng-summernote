System.register("ng-summernote", ["node_modules/@angular/core", "node_modules/@angular/forms", "node_modules/@angular/http", "node_modules/rxjs/add/operator/toPromise"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, forms_1, http_1;
    var NgSummernote;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            NgSummernote = (function () {
                function NgSummernote(_elementRef, _zone, _http) {
                    this._elementRef = _elementRef;
                    this._zone = _zone;
                    this._http = _http;
                    /** Uploaded images server folder */
                    this.uploadFolder = "";
                    this.change = new core_1.EventEmitter();
                }
                Object.defineProperty(NgSummernote.prototype, "value", {
                    get: function () { return this._value; },
                    set: function (v) {
                        if (v !== this._value) {
                            this._value = v;
                            this._onChangeCallback(v);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                NgSummernote.prototype.ngAfterViewInit = function () { };
                /**
                 * Value update process
                 */
                NgSummernote.prototype.updateValue = function (value) {
                    var _this = this;
                    this._zone.run(function () {
                        _this._value = value;
                        _this.onChange(value);
                        _this._onTouchedCallback();
                        _this.change.emit(value);
                    });
                };
                NgSummernote.prototype.ngOnDestroy = function () { };
                NgSummernote.prototype._imageUpload = function (dataUpload) {
                    var _this = this;
                    if (dataUpload.editable) {
                        var data = new FormData();
                        data.append("file", dataUpload.files[0]);
                        data.append("action", "upload");
                        data.append("image", "resizeNoThumb");
                        data.append("folder", this.uploadFolder);
                        $.post({
                            data: data,
                            type: "POST",
                            url: this.hostUpload,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (uploadedImg) {
                                var insertImg = $('<img style="width: 100%;" src="' + uploadedImg.data[0].fileName + '" />');
                                $(_this._elementRef.nativeElement).find('.summernote').summernote('insertNode', insertImg[0]);
                                console.log("Uploaded image: " + uploadedImg.data[0]);
                            },
                            error: function (err) { _this._errHandle(err); }
                        });
                    }
                };
                NgSummernote.prototype._mediaDelete = function (fileUrl) {
                    var data = JSON.stringify({
                        action: "del",
                        file: fileUrl
                    });
                    var headers = new http_1.Headers({
                        'Accept': '*/*',
                        'Content-Type': 'application/json'
                    });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this.hostUpload, data, options)
                        .toPromise()
                        .then(function (response) { return response; })
                        .catch(function (err) { return Promise.reject(err.message || err); });
                };
                /**
                 * Set logical varibles from text input values
                 *
                 * @param any variable, logic varible for setting
                 * @param boolean defaultValue, this value will be set if variable is not set
                 *
                 * @return boolean variable, finally setted variable value
                 */
                NgSummernote.prototype._setLogicVars = function (variable, defaultVal) {
                    variable = typeof variable !== 'undefined' ? true : false;
                    if (!variable && defaultVal)
                        variable = defaultVal;
                    return variable;
                };
                /**
                 * Hanle error in console
                 */
                NgSummernote.prototype._errHandle = function (err) {
                    console.error("Error");
                    console.log(err);
                };
                /**
                 * Implements ControlValueAccessor
                 */
                NgSummernote.prototype.writeValue = function (value) {
                    var _this = this;
                    if (!value) {
                        value = '';
                    }
                    this._value = value;
                    this.height = Number(this.height);
                    this.editable = this._setLogicVars(this.editable, true);
                    this.lang = $.summernote.lang[this.lang] ? this.lang : 'en-US';
                    this._config = this.config || {
                        height: this.height || 200,
                        minHeight: Number(this.minHeight) || this.height || 200,
                        maxHeight: Number(this.maxHeight) || this.height || 500,
                        placeholder: this.placeholder || 'Text...',
                        focus: this._setLogicVars(this.focus, false),
                        airMode: this._setLogicVars(this.airMode, false),
                        dialogsInBody: this._setLogicVars(this.dialogsInBody, false),
                        editable: this.editable,
                        lang: this.lang,
                        disableResizeEditor: this._setLogicVars(this.disableResizeEditor, false)
                    };
                    this._config.callbacks = {
                        onChange: function (evt) {
                            _this.updateValue(evt);
                        },
                        onInit: function (evt) { }
                    };
                    if (typeof this.serverImgUp !== 'undefined') {
                        this._config.callbacks.onImageUpload = function (files) {
                            _this._imageUpload({ files: files, editable: _this.editable });
                        };
                        this._config.callbacks.onMediaDelete = function (target) {
                            var fileUrl;
                            var attributes = target[0].attributes;
                            for (var i = 0; i < attributes.length; i++) {
                                if (attributes[i].name == "src") {
                                    fileUrl = attributes[i].value;
                                }
                            }
                            _this._mediaDelete(fileUrl)
                                .then(function (resp) { console.log(resp.json().data); })
                                .catch(function (err) { _this._errHandle(err); });
                        };
                    }
                    $(this._elementRef.nativeElement).find('.summernote').summernote(this._config);
                    $(this._elementRef.nativeElement).find('.summernote').summernote('code', value);
                };
                NgSummernote.prototype.onChange = function (_) { };
                NgSummernote.prototype.onTouched = function () { };
                NgSummernote.prototype.registerOnChange = function (fn) { this.onChange = fn; };
                NgSummernote.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                NgSummernote.prototype._onChangeCallback = function (_) { };
                NgSummernote.prototype._onTouchedCallback = function () { };
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "height", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "minHeight", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "maxHeight", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "placeholder", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "focus", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "airMode", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "dialogsInBody", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "editable", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "lang", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "disableResizeEditor", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "serverImgUp", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "config", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "hostUpload", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "uploadFolder", void 0);
                __decorate([
                    core_1.Output()
                ], NgSummernote.prototype, "change", void 0);
                __decorate([
                    core_1.Input()
                ], NgSummernote.prototype, "value", null);
                NgSummernote = __decorate([
                    core_1.Component({
                        selector: 'ng2-summernote',
                        providers: [
                            {
                                provide: forms_1.NG_VALUE_ACCESSOR,
                                useExisting: core_1.forwardRef(function () { return NgSummernote; }),
                                multi: true
                            }
                        ],
                        template: "<div class=\"summernote\"></div>",
                    }),
                    __param(0, core_1.Inject(core_1.ElementRef))
                ], NgSummernote);
                return NgSummernote;
            }());
            exports_1("NgSummernote", NgSummernote);
        }
    }
});
