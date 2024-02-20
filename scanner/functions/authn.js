function authn(auth) {
              if (!auth) return null;
              if (typeof auth === 'string') return auth;
              if (auth.user && auth.pass) return auth.user + ':' + auth.pass;
              return auth;
          }