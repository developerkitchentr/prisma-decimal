"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUniversal = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaUniversal = class PrismaUniversal extends client_1.PrismaClient {
    constructor() { super(); }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    convertDecimal(params, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield next(params);
            try {
                if (params.model) {
                    result.map((i) => {
                        Object.keys(i).map((k) => {
                            if (!isNaN(+i[k]) && typeof i[k] === 'object') {
                                i[k] = Number(i[k]);
                            }
                        });
                    });
                }
                else {
                    result.map((i) => {
                        Object.keys(i).map((k) => {
                            let item = i[k];
                            if (item['prisma__type'] === 'decimal') {
                                item['prisma__value'] = Number(item['prisma__value']);
                                item['prisma__type'] = 'number';
                            }
                        });
                    });
                }
            }
            catch (e) {
                console.error(`PrismaNext converting error => ${e}`);
            }
            return result;
        });
    }
};
PrismaUniversal = __decorate([
    (0, common_1.Injectable)()
], PrismaUniversal);
exports.PrismaUniversal = PrismaUniversal;
