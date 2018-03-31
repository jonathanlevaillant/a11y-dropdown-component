<h3 align="center">A11Y Dropdown Component</h3>

---

## Introduction

**a11y-dropdown-component** est une librairie écrite en JavaScript natif permettant de configurer facilement des
menus déroulants accessibles.

Cette librairie respecte l'ensemble des critères d'accessibilité définis par 
[WAI-ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/#menubutton) tout en étant très légère (1.1 Ko minifiée et gzippée)
et simple à configurer.

## Fonctionnalités

- Presser la touche `Enter` ou `Space` sur le bouton d'appel d'un menu replié, déplie le menu déroulant.
- Presser la touche `Enter` ou `Space` sur le bouton d'appel d'un menu déplié, ferme le menu déroulant.
- Presser la touche `Escape`, ferme le menu déroulant et déplace le focus clavier sur le bouton d'appel. (Un clic en 
dehors du menu déroulant, ferme également celui-ci).
- Presser la touche `Up Arrow` sur le bouton d'appel ou sur un élément du menu, déplace le focus clavier sur l'élément
précédent s'il existe, sinon sur le dernier élément du menu déroulant.
- Presser la touche `Down Arrow` sur le bouton d'appel ou sur un élément du menu, déplace le focus clavier sur l'élément
suivant s'il existe, sinon sur le premier élément du menu déroulant.
- Presser la touche `Home` sur le bouton d'appel ou sur un élément du menu, déplace le focus clavier sur le premier élément du menu déroulant.
- Presser la touche `End` sur le bouton d'appel ou sur un élément du menu, déplace le focus clavier sur le dernier élément du menu déroulant.

## Installation

- via [npm](https://www.npmjs.com/) : `npm install a11y-dropdown-component`
- via [yarn](https://yarnpkg.com/lang/en/) : `yarn add a11y-dropdown-component`
- via [jsDelivr](https://www.jsdelivr.com/) : `<script src="https://cdn.jsdelivr.net/npm/a11y-dropdown-component/dist/a11y-dropdown-component.min.js"></script>`

## Utilisation

#### 1. Structure HTML du bouton d'appel

L'attribut de données `data-component="dropdown"` permet d'instancier un nouveau menu déroulant :

```
<button type="button" id="trigger" data-component="dropdown" data-target="dropdown-menu">...</button>
```

**Attributs obligatoires :**

- `id="trigger-ID"` : Identifie le bouton d'appel.
- `data-target="dropdown-ID"` : Associe le bouton d'appel à son menu déroulant.

**Attribut facultatif :**

- `data-open="true"` : Ouvre le menu déroulant lors de son initialisation.  
Cet attribut de données générera l'attribut ARIA `aria-expanded="true"` 

#### 2. Structure HTML du menu déroulant

La librairie génère à la volée les attributs nécessaires afin de répondre aux critères d'accessibilité 
définis par WAI-ARIA.

**Structure initiale :**

```
<ul id="dropdown-menu" class="c-dropdown__menu">
  <li data-item><a href="#">Link 1</a></li>
  <li data-item><a href="#">Link 2</a></li>
  <li data-item><a href="#">Link 3</a></li>
</ul>
```

**Structure finale (après le chargement du script) :**

```
<ul id="dropdown-menu" class="c-dropdown__menu" role="menu" aria-labelledby="trigger" tabindex="-1">
  <li data-item role="none"><a href="#" role="menuitem" tabindex="-1">Link 1</a></li>
  <li data-item role="none"><a href="#" role="menuitem" tabindex="-1">Link 2</a></li>
  <li data-item role="none"><a href="#" role="menuitem" tabindex="-1">Link 3</a></li>
</ul>
```

#### 3. Ajout de la librairie JavaScript

Vous pouvez importer directement **a11y-dropdown-component** dans votre projet JavaScript 
en utilisant une syntaxe ES6 (ES2015) ou CommonJS :

```
import Dropdowns from 'a11y-dropdown-component'; // es6 module
const Dropdowns = require('a11y-dropdown-component').default; // commonjs module
```

#### 4. Instanciation JavaScript

L'instanciation de tous les menus déroulants possédant l'attribut de données `data-component="dropdown"` se fait simplement
par la méthode `init()` :

```
Dropdowns.init();
```

#### 5. Événements JavaScript

En cas de besoin, vous pouvez déclencher le rendu d'un ou plusieurs menus déroulants directement en JavaScript 
grâce à la méthode `render('trigger-ID')` :

```
Dropdowns.render('trigger-js');
```

**Paramètre facultatif :**

- `isOpen: true` : Déclenche l'ouverture du menu déroulant.

```
Dropdowns.render('trigger-js', {
  isOpen: true,
});
```

**Suppression d'un menu déroulant instancié :**

Vous pouvez supprimer le rendu d'un ou plusieurs menus déroulants grâce à la méthode `destroy('trigger-ID')` :

```
Dropdowns.destroy('trigger-js');
```

#### 6. Styles CSS

**a11y-dropdown-component** a fait le choix de ne pas embarquer de styles CSS par défaut.  
Vous êtes donc libres d'utiliser les styles que vous souhaitez !

Néanmoins, nous recommandons au minimum ce style nécessaire à l'ouverture et à la fermeture d'un menu déroulant :

```
.c-dropdown__menu[aria-hidden="true"] {
  display: none;
}
```

Si vous désirez utiliser des styles CSS par défaut, vous pouvez consulter le fichier `main.css` de la démo disponible 
[ici](https://github.com/jonathanlevaillant/a11y-dropdown-component/blob/master/demo/src/main.css)

## Contribution

Si vous désirez contribuer à ce projet, rien de plus simple, suivez ces quelques étapes ! :kissing_closed_eyes:  
**a11y-dropdown-component** suit les standards de développement JavaScript ES2015.

#### Environnement de développement

1. Clonez le dépôt GitHub : `$git clone https://github.com/jonathanlevaillant/a11y-dropdown-component.git`
2. Installez le gestionnaire de packages [yarn](https://yarnpkg.com/en/docs/install#mac-tab)
3. Installez les dépendances de développement : `yarn start`
4. Lancez le projet (watch) : `yarn dev`
5. Créez une pull-request :ok_hand:

## D'autres librairies accessibles ?

- [a11y-dialog-component](https://github.com/jonathanlevaillant/a11y-dialog-component) - Fenêtres modales accessibles.
- [a11y-accordion-component](https://github.com/jonathanlevaillant/a11y-accordion-component) - Accordéons accessibles.

## Créateur

**Jonathan Levaillant**

- [https://twitter.com/jlwebart](https://twitter.com/jlwebart)
- [https://github.com/jonathanlevaillant](https://github.com/jonathanlevaillant)

## Licence

Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).
