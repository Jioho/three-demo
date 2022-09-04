import Experience from '../Experience/Experience'

export declare global {
  interface Window {
    //window对象属性
    experience: Experience //加入对象
  }
}
