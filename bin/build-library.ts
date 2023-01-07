import fs from 'fs';
import { parse } from 'yaml';

const library = [];
const dir = 'data/patch';

function collectOne(filename, dest) {
    console.log(filename);
    const yml = fs.readFileSync(filename, 'utf-8');
    const patch = parse(yml);
    dest.push(patch);
}

fs.readdirSync(dir).forEach((filename) => {
    collectOne(`${dir}/${filename}`, library);
});

// fs.writeFileSync('static/library.json', JSON.stringify(library), { encoding: 'utf-8' });

console.log('Writing db');
const compiled = `export default library = ${JSON.stringify(library)};`;
fs.writeFileSync('db/library.js', compiled, { encoding: 'utf-8' });

