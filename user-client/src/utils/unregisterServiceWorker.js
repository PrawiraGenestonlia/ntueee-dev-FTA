// const unregisterServiceWorker = async () => {
//   navigator && navigator.serviceWorker && navigator.serviceWorker.getRegistrations().then(async registrations => {
//     for (let registration of registrations) {
//       registration.update();
//     }
//     return new Promise(async (resolve, reject) => {
//       try {
//         const result = [];
//         for (let i = 0; i < registrations.length; i++) {
//           const j = await registrations[i].unregister();
//           console.log(j);
//           result.push(j);
//         }
//         resolve(result);
//       } catch (err) {
//         reject(err);
//       }
//     });
//   });
// }

const unregisterServiceWorker = async () => {
  navigator && navigator.serviceWorker && navigator.serviceWorker.getRegistrations().then(registrations => {
    Promise.all(registrations.map((r) => r.unregister()))
  });
}


export default unregisterServiceWorker;