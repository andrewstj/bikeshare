import './common/env';
import Server from './common/server';
import routes from './routes';

export default (() => {
  const server = new Server();
  return server.initialize().then(() => {
    server.router(routes).listen(process.env.PORT);
  });
})();
