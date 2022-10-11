
# LLVM IR FOLDING

## Develop

```
npm install -g yo generator-code
```

Open project folder, and then press `F5` to open Development Host window.

## Package

```
npm install -g vsce
vsce package
```

auto-incrementing version
```
# major, minor, patch
vsce package minor
```

## Install

```
npm install
npm install -g vsce

vsce package
code --install-extension llvm-ir-dump-folding-0.0.1.vsix
```
