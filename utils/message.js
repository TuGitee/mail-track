/**
 * @description: 生成返回数据
 * @param {Object} res
 * @param {number} code 
 * @param {string} msg 
 * @param {any} data 
 * @returns 
 */
export const createMessage = (res, code = 200, msg = "", data = null) => {
	return res.status(code).send({
		msg,
		data
	})
};