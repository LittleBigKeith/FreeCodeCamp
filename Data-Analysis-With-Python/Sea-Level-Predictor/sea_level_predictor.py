import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import linregress
from scipy import stats

def draw_plot():
    # Read data from file
    data = pd.read_csv("epa-sea-level.csv")

    # Create scatter plot
    colors = np.random.rand(len(data["Year"]))
    plt.scatter(data["Year"], data["CSIRO Adjusted Sea Level"], c=colors, alpha=0.5)
    
    # Create first line of best fit
    slope, intercept, r_value, p_value, std_err = stats.linregress(data["Year"], data["CSIRO Adjusted Sea Level"])
    data_extrapolated = pd.concat([data, pd.DataFrame({"Year": np.arange(max(data["Year"]) + 1, 2051, 1)})], ignore_index=True)
    plt.plot(data_extrapolated["Year"], intercept + slope*data_extrapolated["Year"], 'r', label='fitted line')
    # Create second line of best fit
    data_since_2000 = data[data["Year"] >= 2000]
    data_since_2000_extrapolated = pd.concat([data_since_2000, pd.DataFrame({"Year": np.arange(max(data_since_2000["Year"]) + 1, 2051, 1)})], ignore_index=True)
    slope, intercept, r_value, p_value, std_err = stats.linregress(data_since_2000["Year"], data_since_2000["CSIRO Adjusted Sea Level"])
    plt.plot(data_since_2000_extrapolated["Year"], intercept + slope*data_since_2000_extrapolated["Year"], 'g', label='fitted line')
    # Add labels and title
    plt.xlabel("Year")
    plt.xticks(np.arange(1850, 2076, 25))
    plt.ylabel("Sea Level (inches)")
    plt.title("Rise in Sea Level")
    
    # Save plot and return data for testing (DO NOT MODIFY)
    plt.show()
    plt.savefig('sea_level_plot.png')
    return plt.gca()