import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1
df = pd.read_csv("medical_examination.csv")

# 2
df['overweight'] = ((df['weight'] / ((df['height'] / 100) ** 2) > 25).astype(int))

# 3
df['cholesterol'] = df['cholesterol'].map(lambda x: (x > 1)).astype(int)
df['gluc'] = df['gluc'].map(lambda x: (x > 1)).astype(int)

# 4
def draw_cat_plot():
    # 5
    df_cat = pd.melt(df, id_vars=["cardio"], value_vars=["cholesterol", "gluc", "smoke", "alco", "active", "overweight"])

    # 6
    df_cat = df_cat.groupby(["cardio", "variable", "value"]).size().reset_index(name='total')
    
    # 7

    # 8
    fig = sns.catplot(
        data=df_cat, x="variable", y="total", col="cardio", hue="value",
        kind="bar", height=4, aspect=1.2,
    ).fig

    # 9
    fig.savefig('catplot.png')
    return fig


# 10
def draw_heat_map():
    # 11
    df_heat = df[df.ap_lo <=df.ap_hi]
    df_heat = df_heat[df_heat.height >= df.height.quantile(0.025)]
    df_heat = df_heat[df_heat.height <= df.height.quantile(0.975)]
    df_heat = df_heat[df_heat.weight >= df.weight.quantile(0.025)]
    df_heat = df_heat[df_heat.weight <= df.weight.quantile(0.975)]


    # 12
    corr = df_heat.corr().round(1)

    # 13
    mask = np.triu(np.ones_like(corr, dtype=bool))


    # 14
    fig, ax = plt.subplots(figsize=(16,16))

    # 15
    sns.heatmap(corr, mask = mask, annot = True, fmt = ".1f", cmap = "YlGnBu", vmin = 0, vmax = 0.7, square = True, linewidths = .5)

    # 16
    fig.savefig('heatmap.png')
    return fig

draw_cat_plot()
draw_heat_map()