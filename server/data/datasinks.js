import { Router } from 'express';
import { Datasink, Datapoint } from '../../models';

var router = Router();

router.get('/datasinks/:user', (req, res, next) => {
  Datasink.findAll({
    attributes: [
      'id',
      'readKey',
      'writeKey',
      'title',
      'definition', // not so much a definition than code to run when dp received
      'visibility',
      'createdAt',
      'schema',
    ],
    where: {
      user: req.params.user,
    },
  }).then(datasinks => {
    // TODO add an extra column on datasink that contains timestamp of last write, so no need to do this other query.
    let queries = [];
    for (let sink of datasinks) {
      queries.push(Datapoint.max('createdAt', { where: { datasink: sink.id } }));
    }
    Promise.all(queries).then(results => {
      let sinks = datasinks.map(x => x.dataValues);
      for (let sink in sinks) {
        sinks[sink].latestDataPoint = results[sink];
      }
      res.json(sinks);
    });
  });
});

export default router;
