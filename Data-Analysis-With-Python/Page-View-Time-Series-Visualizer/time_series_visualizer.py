import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data (Make sure to parse dates. Consider setting index column to 'date'.)
df = pd.read_csv("fcc-forum-pageviews.csv")

# Clean data
lower_limit = df.value.quantile(0.025)
upper_limit = df.value.quantile(0.975)
df = df[df.value >= lower_limit]
df = df[df.value <= upper_limit]


def draw_line_plot():
    # Draw line plot
    fig, ax = plt.subplots(figsize=(20,8))
    plt.plot(df.value, color="red")
    plt.title("Daily freeCodeCamp Forum Page Views 5/2016-12/2019")


    ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m'))    
    ax.xaxis.set_major_locator(mdates.DayLocator(interval=185))
    plt.xlabel("Date")
    plt.ylabel("Page Views")
    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy(deep=True)
    df_bar.index = pd.to_datetime(df_bar['date'],format='%Y-%m-%d')
    df_bar = df_bar.groupby(by=[df_bar.index.year, df_bar.index.month]).mean(numeric_only=True)
    df_bar = df_bar.reset_index(names=["year", "month"])
    months = ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"]
    df_bar["month"] = pd.Categorical(pd.to_datetime(df_bar['month'], format='%m').dt.month_name(), categories=months, ordered=True)
    df_bar = df_bar.pivot_table(index='year', columns='month', values='value')
    
    # Draw bar plot    
    ax = df_bar.plot(kind="bar",figsize = (10, 10))
    # Get a Matplotlib figure from the axes object for formatting purposes
    fig = ax.get_figure()

    plt.xlabel("Years")
    plt.ylabel("Average Page Views")
    plt.legend(title="Months")
    plt.show()
    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy(deep=True)
    df_box.reset_index(inplace=True)
    df_box['year'] = pd.DatetimeIndex(df_box['date']).year
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    df_box['month'] = pd.Categorical(pd.DatetimeIndex(df_box['date']).strftime("%b"), categories=months, ordered=True)

    # Draw box plots (using Seaborn)
    fig, ax = plt.subplots(1, 2, figsize=(20,8))
    plt.subplot(121)
    sns.boxplot(data=df_box, x="year", y="value", hue="year", palette="deep")
    plt.title("Year-wise Box Plot (Trend)")
    plt.xlabel("Year")
    plt.ylabel("Page Views")

    plt.subplot(122)
    sns.boxplot(data=df_box, x="month", y="value", hue="month", palette="pastel")
    plt.title("Month-wise Box Plot (Seasonality)")
    plt.xlabel("Month")
    plt.ylabel("Page Views")

    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
