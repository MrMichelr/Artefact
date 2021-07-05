# Artefact: Work in Progress
__This document describes feature that are not implemented, yet. Please refer to the [Docs](https://github.com/MrMichelr/Artefact/blob/main/doc/README.md) for the current state of Artefact__

## Table of Content
- [Version 1](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#version-1)
    - [Basic Artifacts](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#basic-artifacts)
    - [Variables](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#variables)
    - [Compilation](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#compilation)  

## Version 1
**Progress:**
[□□□□□□□□□□] 0%
<!--Cheat Sheet:
Empty: □
Full:  ■
Semi:  ◧
-->
<br/>

### Basic Artifacts
- [Headings](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#headings)
- [Link](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#link)
- [Image](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#image)
- [Citation Block](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#citation-block)
- [Paragraph](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#paragraph)
- [Specials](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#specials)

#### Headings
<span><b>ETA: </b><b class="todo"></b></span>

Heading is the first artifact to structure the Artefact templating part.

```
* Heading 1
** Heading 2
*** Heading 3
**** Heading 4
***** Heading 5
****** Heading 6
```
- The number of stars `*` define the level of Heading
- We need a space between the artifact & the content

#### Link
<span><b>ETA: </b><b class="todo"></b></span>

Link is essential to have an interactive document

##### Block

The "*block*" is the classic version of the artifact: on the beginning of the line

```
@ Link text (https://yourlink.ext)
```
- The artifact for the link is `@`, it's follow by a space
- After the artifact we enter the text which contain the link
- After the content we have the link between `()`

##### Inline

The "*inline*" is an embed version of the "*block*" type

```
... @/Link text (https://yourlink.ext) ...
```
- The artifact for the link is `@`, it's follow by `/`
- After the artifact we enter the text which contain the link
- After the content we have the link between `()`

#### Image
<span><b>ETA: </b><b class="todo"></b></span>

The Image Artifact is a **composite**. It can be compose by multiple Artifacts

##### Basic

```
& -- Image (source)
```
- The artifact for the image is `&`, it's follow by a space
- After the artifact, we have the composite part `--` for the basic , it's follow by a space
- After the composite, we have the content (`alt` tag)
- After the content we have the link between `()`

##### Caption

```
& -> Caption
```
- The artifact for the image is `&`, it's follow by a space
- After the artifact, we have the composite part `->` for the caption , it's follow by a space
- After the composite, we have the content

#### Citation Block
<span><b>ETA: </b><b class="todo"></b></span>

The Citation Block Artifact is a **composite**. It can be compose by multiple Artifacts

##### Basic

```
" -- Citation Block
```
- The artifact for the citation block is `"`, it's follow by a space
- After the artifact, we have the composite part `--` for the basic , it's follow by a space
- After the composite, we have the content`

##### Author

```
" -> Author
```
- The artifact for the citation block is `"`, it's follow by a space
- After the artifact, we have the composite part `->` for the author , it's follow by a space
- After the composite, we have the content

#### Paragraph
<span><b>ETA: </b><b class="todo"></b></span>

The Paragraph is the default. It's the only block without any artifacts

#### Specials

- [Comments](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#comments)
- [Meta Tags](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#meta-tags)
- [Anchors](https://github.com/MrMichelr/Artefact/blob/master/doc/upcoming.md#anchors)

#### Comments
<span><b>ETA: </b><b class="todo"></b></span>

Comments are a good way to note something just forus, for not forget something, or add context to the content

```
// Comment
```
- The artifact for the comment is `//`, it's follow by a space

##### Meta Tags
<span><b>ETA: </b><b class="todo"></b></span>

**Artefact** will be compile in HTML so, we can have the possibility to add meta tags.
Meta tags are subset of Comments in **Artefact**

```
/ -(name) comment
```
- The artifact for the meta tags is `/`, it's follow by a space
- After the artifact you add the composite `-()` with the name of your meta tag (e.g. "Author", "Description", "viewport", etc.)
- After the composite is the content of the meta tag

##### Anchors
<span><b>ETA: </b><b class="todo"></b></span>

The anchor is a good way to add a custom link to your own file anytime you want

```
± -(name of the anchor)
```

- The artifact for the meta tags is `±`, it's follow by a space
- After the artifact you add the composite `-()` with the name of your anchor

<br/>

### Variables
<span><b>ETA: </b><b class="todo"></b></span>

#### Declare

```
$ variable = content
```

- The artifact for the variable is `$`, it's follow by a space
- After the artifact you add the name an equal symbol and the content

#### Use

Variable are only usable inline

```
... $/variable ...
```

- The artifact for the variable is `$`, it's follow by `/`
- After the artifact we enter the name of the variable

### Compilation
<span><b>ETA: </b><b class="todo"></b></span>


<style>
.todo {
    height: 30px;
    width: 100px;
    background-color: #E91E63;
    border-radius: 4px;
    padding: 3px 5px;
    margin-left: 10px;
    color: #fff;
}
.todo::after{
    content: "TODO"
}
.wip {
    height: 30px;
    width: 100px;
    background-color: #FF9800;
    border-radius: 4px;
    padding: 3px 5px;
    margin-left: 10px;
    color: #000;
}
.wip::after{
    content: "WIP"
}
.review {
    height: 30px;
    width: 100px;
    background-color: #673AB7;
    border-radius: 4px;
    padding: 3px 5px;
    margin-left: 10px;
    color: #FFF;
}
.review::after{
    content: "IN REVIEW"
}
.done {
    height: 30px;
    width: 100px;
    background-color: #4CAF50;
    border-radius: 4px;
    padding: 3px 5px;
    margin-left: 10px;
    color: #FFF;
}
.done::after{
    content: "DONE"
}
</style>