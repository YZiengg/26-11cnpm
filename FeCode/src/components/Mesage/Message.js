import { message } from "antd"

const success = (mes='thành công') => {
    message.success(mes)
}

const error = (mes='thất bại') => {
    message.error(mes)
}

const warning = (mes='warning') => {
    message.success(mes)
}

export {success, error, warning}