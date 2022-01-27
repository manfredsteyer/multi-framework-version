import { loadRemoteEntry } from '@angular-architects/module-federation';

Promise.all([
   loadRemoteEntry('http://localhost:3000/remoteEntry.js', 'mfe1'),
   // loadRemoteEntry('https://brave-glacier-0ffc18c10.azurestaticapps.net/remoteEntry.js', 'mfe1')
])
.catch(err => console.error('Error loading remote entries', err))
.then(() => import('./bootstrap'))
.catch(err => console.error(err));






