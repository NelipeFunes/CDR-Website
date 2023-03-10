"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const token_1 = __importDefault(require("../utils/token"));
const User_service_1 = __importDefault(require("../services/User.service"));
const UserController = {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield User_service_1.default.validateBody(req.body);
            const users = yield User_service_1.default.createUser(req.body);
            const token = token_1.default.makeToken(users);
            return res.status(http_status_1.default.CREATED).json({ token });
        });
    },
    readUsers(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_service_1.default.readUsers();
            return res.status(http_status_1.default.OK).json(users);
        });
    },
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_service_1.default.logIn(req.body);
            const token = token_1.default.makeToken(user);
            return res.status(http_status_1.default.OK).json({ token });
        });
    },
};
exports.default = UserController;
