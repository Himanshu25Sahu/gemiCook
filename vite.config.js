import { defineConfig } from "vite";
import reactRefresh from '@vitejs/plugin-react'
import vitePluginSvgr from "vite-plugin-svgr";

export default defineConfig({
    build:{
        outDir:'build'
    },
    base:"/gemiCook/",
    plugins:[
        reactRefresh(),
        vitePluginSvgr({
            svgrOptions:{
                icon:true,
            },

        })

    ],
    
})