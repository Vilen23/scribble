import { atom } from "recoil";
import {recoilPersist} from 'recoil-persist'
const {persistAtom} = recoilPersist()
export const roomUserAtom = atom({
    key: 'roomUserState',
    default: {
        userId:'',
        id:''
    },
    
    effects_UNSTABLE: [persistAtom]
})