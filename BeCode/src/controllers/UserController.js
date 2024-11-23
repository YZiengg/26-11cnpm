const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');



const createUser = async (req, res) => {
    try {
        const {  email, password, confirmPassword } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);
        
        if (!email || !password || !confirmPassword ) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Tất cả các trường đều là bắt buộc'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        } else if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Mật khẩu và xác nhận mật khẩu không khớp'
            });
        }

        const response = await UserService.createUser(req.body);
        return res.status(201).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email và mật khẩu là bắt buộc'
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            });
        }

        const response = await UserService.loginUser(req.body);
        const {refresh_token,...newReponse}=response
        res.cookie('refresh_token',refresh_token,{
            httpOnly:true,
            secure: false,
            samesite:'strict',
            path:'/'
        })
        return res.status(200).json(newReponse);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ID người dùng là bắt buộc'
            });
        }

        const response = await UserService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ID người dùng là bắt buộc'
            });
        }

        const response = await UserService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ID người dùng là bắt buộc'
            });
        }
        const response = await UserService.getDetailUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(400).json({
                status: 'ERR',
                message: 'token is required'
            });
        }
        const response = await JwtService.refreshTokenJwtService(token);
        
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};

const logoutUser = async (req, res) => {
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
    try {
       res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'ok',
            message: 'Đăng xuất thành công'
        });
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
};