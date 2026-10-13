# NAGNOVA DESIGNER

Site vitrine construit avec React et Vite.

## Démarrage

```sh
npm install
npm run dev
```

## Formulaire EmailJS

L'envoi automatique nécessite un compte EmailJS, un service e-mail connecté et un modèle. L'adresse seule ne peut pas envoyer de courriel depuis le navigateur.

1. Créez un compte sur [EmailJS](https://www.emailjs.com/) puis ouvrez **Email Services** et ajoutez un service Gmail. Connectez la boîte qui servira à envoyer les demandes et vérifiez le service avec leur courriel de test.
2. Ouvrez **Email Templates**, créez un modèle et réglez ses champs ainsi :
   - **To Email** : `contact.nagnova@gmail.com`
   - **Reply To** : `{{reply_to}}`
   - **From Name** : `NAGNOVA DESIGNER`
   - **Subject** : `Nouveau message de {{from_name}} — {{subject}}`
   - **Content** : collez le contenu de [emailjs-template.html](emailjs-template.html) dans l'éditeur HTML.
3. Gardez les variables du modèle avec deux accolades, par exemple `{{message}}`. Le message du client reste ainsi du texte et n'est pas interprété comme du HTML.
4. Récupérez le **Service ID** dans Email Services, le **Template ID** dans le modèle et la **Public Key** dans **Account**.
5. Copiez `.env.example` vers `.env.local` à la racine du projet et remplacez les valeurs d'exemple par ces trois identifiants.
6. Redémarrez Vite. Après déploiement, ajoutez les trois mêmes variables dans les paramètres d'environnement de l'hébergeur.

Le champ **To Email** détermine la boîte qui reçoit les demandes. **Reply To** permet de répondre au client directement depuis le courriel reçu. Le modèle fourni met en forme la demande avec l'en-tête et la signature NAGNOVA.

EmailJS explique également [comment connecter une boîte e-mail](https://www.emailjs.com/docs/user-guide/connecting-email-services/) et [comment créer un modèle](https://www.emailjs.com/docs/user-guide/creating-email-templates/).

Le formulaire utilise l'API REST EmailJS. La clé publique peut être exposée côté navigateur ; ne mettez jamais de clé privée dans les variables `VITE_`.
