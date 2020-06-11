/**   
 * api接口统一管理
 */

// test模块接口
import performance from './performance';
import base from './base'
// 其他模块的接口……


// 导出接口
export default {
  ...performance,
  base
  // ……
}
