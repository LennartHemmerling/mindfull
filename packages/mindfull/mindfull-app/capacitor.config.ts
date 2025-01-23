import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
    appId: 'com.fromscript.mindfullapp',
    appName: 'mindfull',
    webDir: 'dist',
    plugins: {
        CapacitorHttp: {
            enabled: true
        }
    }
}

export default config
