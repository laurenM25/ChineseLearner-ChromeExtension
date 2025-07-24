const esbuild = require('esbuild');
esbuild.build({
    entryPoints: ['./content.js'],
    bundle: true,
    outfile: './dist/content.js',
    platform: 'browser',
    format: 'iife',
    sourcemap: true,
    define: {
        'process.env.NODE_ENV': '"production"', // if needed by some libs
    },
    // This tells esbuild to replace `require("fs")` or `import fs` with an empty object
    // effectively ignoring it for the browser bundle
    inject: [], // no inject
    external: ['fs'],
    // Or use the "alias" plugin to stub fs:
    plugins: [
        {
            name: 'fs-stub',
            setup(build) {
                build.onResolve({ filter: /^fs$/ }, args => {
                    return { path: args.path, namespace: 'fs-stub' }
                });
                build.onLoad({ filter: /.*/, namespace: 'fs-stub' }, () => {
                    return { contents: 'export default {}', loader: 'js' };
                });
            },
        },
    ],
});
