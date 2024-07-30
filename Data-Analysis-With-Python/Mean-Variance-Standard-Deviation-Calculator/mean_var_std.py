import numpy as np

def calculate(list):
    if len(list) < 9:
        raise ValueError("List must contain nine numbers.")
    return {
        "mean": [np.array(list).reshape(3, 3).mean(axis=0).tolist(),
                 np.array(list).reshape(3, 3).mean(axis=1).tolist(),
                 np.array(list).mean()],
        "variance": [np.array(list).reshape(3, 3).var(axis=0).tolist(),
                     np.array(list).reshape(3, 3).var(axis=1).tolist(),
                     np.array(list).var()],
        "standard deviation": [np.array(list).reshape(3, 3).std(axis=0).tolist(),
                               np.array(list).reshape(3, 3).std(axis=1).tolist(),
                               np.array(list).std()],
        "max": [np.array(list).reshape(3, 3).max(axis=0).tolist(),
                np.array(list).reshape(3, 3).max(axis=1).tolist(),
                np.array(list).max()],
        "min": [np.array(list).reshape(3, 3).min(axis=0).tolist(),
                np.array(list).reshape(3, 3).min(axis=1).tolist(),
                np.array(list).min()],
        "sum": [np.array(list).reshape(3, 3).sum(axis=0).tolist(),
                np.array(list).reshape(3, 3).sum(axis=1).tolist(),
                np.array(list).sum()]
        }