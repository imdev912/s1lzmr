import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { nanoid } from "nanoid";

import { BucketCount } from "./features/bucket/BucketCount";
import { BucketView } from "./features/bucket/BucketView";
import { ColorCount } from "./features/ball/ColorCount";
import { BallView } from "./features/ball/BallView";
import { BallCount } from "./features/ball/BallCount";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { bucket, color } from "./data/data";

import { AppState, appActions } from "./features/app/appSlice";
import { Bucket, Buckets, bucketActions } from "./features/bucket/bucketSlice";
import { Ball, Balls, ballActions } from "./features/ball/ballSlice";

type State = {
  app: AppState,
  bucket: Buckets,
  ball: Balls
}

export default function App() {
  const bucket_count = useSelector((state: State) => state.app.numberOfBuckets) || 0;
  const color_count = useSelector((state: State) => state.app.numberOfColors) || 0;

  const app_buckets: Buckets = useSelector((state: State) => state.bucket);
  const app_balls: Balls = useSelector((state: State) => state.ball);

  const buckets: Array<Bucket> =
    Object.values(app_buckets).slice(0, bucket_count) || [];
  const balls: Array<Ball> =
    Object.values(app_balls).slice(0, color_count) || [];

  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "bucket-count") {
      const input = parseInt(value, 10);
      const count = isNaN(input) ? 0 : Math.max(0, Math.min(5, input));
      dispatch(appActions.updateBucketCount({ count }));
    } else if (name === "color-count") {
      const input = parseInt(value, 10);
      const count = isNaN(input) ? 0 : Math.max(0, Math.min(5, input));
      dispatch(appActions.updateColorCount({ count }));
    } else if (name.startsWith("bucket") && name.endsWith("volume")) {
      const input = parseFloat(value);
      const volume = isNaN(input) ? 0 : Math.max(0, Math.min(200, input));

      dispatch(
        bucketActions.addBucket({
          name: name.replace(/(bucket)|(volume)|(-)/g, ""),
          volume: volume
        })
      );
    } else if (name.startsWith("ball") && name.endsWith("volume")) {
      const input = parseFloat(value);
      const volume = isNaN(input) ? 0 : Math.max(0, Math.min(5, input));
      dispatch(
        ballActions.updateBallVolume({
          color: name.replace(/(ball)|(volume)|(-)/g, ""),
          volume: volume
        })
      );
    } else if (name.startsWith("ball") && name.endsWith("count")) {
      const input = parseInt(value, 10);
      const count = isNaN(input) ? 0 : Math.max(0, Math.min(50, input));
      dispatch(
        ballActions.updateBallCount({
          color: name.replace(/(ball)|(count)|(-)/g, ""),
          count: count
        })
      );
    }

    event.target.focus();
  };

  const pickRandom = () => {
    dispatch(bucketActions.clearBall());

    let remainBalls = balls.reduce((acc, cur: Ball) => (cur.count ? acc += cur.count : acc), 0);
    let remainVolume = buckets.reduce((acc, cur: Bucket) => (cur.volume ? acc += cur.volume : acc), 0);

    const ballLookup: { [value: string]: number } = balls.reduce((acc, curr) => {
      return { ...acc, [curr.color]: curr.count };
    }, {});

    const volumeLookup: { [value: string]: number } = balls.reduce((acc, curr) => {
      return { ...acc, [curr.color]: curr.volume };
    }, {});

    const bucketLookup: { [value: string]: number } = buckets.reduce((acc, curr) => {
      return { ...acc, [curr.name]: curr.volume };
    }, {});

    const ballKeys = Object.keys(ballLookup);
    const bucketKeys = Object.keys(bucketLookup);
    let limit = ballKeys.length * bucketKeys.length;

    while (remainBalls > 0 && remainVolume > 0) {
      if (ballKeys.length < 1 || bucketKeys.length < 1) {
        break;
      }

      let randomBucket: string = bucketKeys[Math.floor(Math.random() * bucketKeys.length)];
      let randomBall: string = ballKeys[Math.floor(Math.random() * ballKeys.length)];

      if (bucketLookup[randomBucket] <= 0) {
        bucketKeys.splice(bucketKeys.indexOf(randomBucket), 1);
        delete bucketLookup[randomBucket];
        continue;
      }

      if (ballLookup[randomBall] <= 0) {
        ballKeys.splice(ballKeys.indexOf(randomBall), 1)
        delete ballLookup[randomBall];
        continue;
      }

      if (bucketLookup[randomBucket] < volumeLookup[randomBall]) {
        if (limit) {
          limit--;
          continue;
        }

        break;
      }

      while (bucketLookup[randomBucket] >= volumeLookup[randomBall]) {
        if (ballKeys.length < 1 || bucketKeys.length < 1) {
          break;
        }

        if (ballLookup[randomBall] <= 0) {
          ballKeys.splice(ballKeys.indexOf(randomBall), 1)
          delete ballLookup[randomBall];
          break;
        }

        ballLookup[randomBall]--;
        bucketLookup[randomBucket] -= volumeLookup[randomBall];
        remainVolume -= volumeLookup[randomBall];
        remainBalls--;

        dispatch(
          bucketActions.putBall({
            name: randomBucket,
            color: randomBall,
            space: bucketLookup[randomBucket]
          })
        );

        randomBall = ballKeys[Math.floor(Math.random() * ballKeys.length)];
      }
    }
  };

  React.useEffect(() => {
    if (bucket_count > 0) {
      Array.from(Array(bucket_count).keys()).map((value, index) => {
        dispatch(
          bucketActions.addBucket({
            name: bucket[index]
          })
        );
      });
    }
  }, [bucket_count]);

  React.useEffect(() => {
    if (color_count > 0) {
      Array.from(Array(color_count).keys()).map((value, index) => {
        dispatch(
          ballActions.addBall({
            color: color[index]
          })
        );
      });
    }
  }, [color_count]);

  return (
    <div className="App p-5">
      <form>
        <h2>Number of buckets:</h2>

        <BucketCount
          count={bucket_count}
          handleInputChange={handleInputChange}
        />

        <h2>Add the volume of the buckets:</h2>

        <BucketView buckets={buckets} handleInputChange={handleInputChange} />

        {buckets.length > 0 &&
          buckets.filter((item: Bucket) => item.volume && item.volume > 0)
            .length === bucket_count && (
            <>
              <ColorCount
                count={color_count}
                handleInputChange={handleInputChange}
              />

              <BallView balls={balls} handleInputChange={handleInputChange} />
            </>
          )}

        {balls.length > 0 &&
          balls.filter((item: Ball) => item.volume && item.volume > 0)
            .length === color_count && (
            <>
              <h2>
                Input the number of each colored ball to be placed inside the
                buckets:
              </h2>

              <BallCount balls={balls} handleInputChange={handleInputChange} />
            </>
          )}
      </form>

      {buckets.length > 0 &&
        buckets.filter((item: Bucket) => item.volume && item.volume > 0)
          .length === bucket_count &&
        balls.length > 0 &&
        balls.filter((item: Ball) => item.volume && item.volume > 0).length ===
        color_count && (
          <>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-nowrap">Buckets | Balls</th>

                  {balls.map((ball) => {
                    return <th key={nanoid()}>{ball.color}</th>;
                  })}

                  <th className="text-nowrap">Total Balls</th>
                  <th className="text-nowrap">Volume Left</th>
                </tr>
              </thead>

              <tbody>
                {buckets.length > 0 &&
                  buckets
                    .filter((bucket: Bucket) => bucket.balls)
                    .map((item) => {
                      return (
                        <tr key={nanoid()}>
                          <th>{item.name}</th>

                          {balls.map((ball) => {
                            return (
                              <td key={nanoid()}>{item.balls && item.balls[ball.color]}</td>
                            );
                          })}

                          <td>
                            {item.balls && Object.values(item.balls).reduce(
                              (acc, cur) => (acc += cur),
                              0
                            )}
                          </td>

                          <td>{item.space}</td>
                        </tr>
                      );
                    })}

                <tr>
                  <th>Total</th>

                  {balls.map((ball) => {
                    return (
                      <td key={nanoid()}>
                        {buckets.reduce((acc, item) => {
                          if (item["balls"] && item["balls"][ball.color]) {
                            return (acc += item["balls"][ball.color]);
                          }

                          return acc;
                        }, 0)} / {ball.count}
                      </td>
                    );
                  })}

                  <td>
                    {buckets
                      .filter((bucket: Bucket) => bucket.balls)
                      .reduce((acc, item) => {
                        return (item.balls ? acc += Object.values(item.balls).reduce(
                          (n_acc, n_cur) => (n_acc += n_cur),
                          0
                        ) : acc);
                      }, 0)}
                  </td>

                  <td>
                    {buckets.reduce((acc, curr) => {
                      if (curr.space) {
                        acc += curr.space;
                        return parseFloat(parseFloat(acc.toString()).toFixed(2));
                      }

                      return acc;
                    }, 0)}
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-outline-primary" onClick={pickRandom}>
              Suggest
            </button>
          </>
        )}
    </div>
  );
}
