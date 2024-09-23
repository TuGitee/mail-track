/**
 * @description: 生成返回数据
 * @param {number} code 
 * @param {string} msg 
 * @param {any} data 
 * @returns 
 */
export const createMessage = (code = 200, msg = "", data = null) => {
	return {
		code,
		msg,
		data,
	};
};