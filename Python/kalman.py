from pykalman import UnscentedKalmanFilter
import numpy as np

ukf = UnscentedKalmanFilter(lambda x, w: x + np.sin(w), lambda x, v:x + v, observation_covariance=0.1)

(filtered_state_means, filtered_state_covariance) = ukf.filter([0,0,0])
(smoothed_state_means, smoothed_state_covariance) = ukf.smooth([0,0,0])


def smothingData(args):
    delta = ukf.smooth(args)[0]
    return delta

def filteringData(args):
    alpha = ukf.filter(args)
    return alpha
