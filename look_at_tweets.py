import json
from pandas import DataFrame


data = []
with open('tweets_annotated.json') as f:
    for line in f:
        data.append(json.loads(line))

data_explore = []
for tweet in data:
    important = [tweet['raw']['id_str'], tweet['raw']['text'], tweet['irony_judgment'][0]['irony']]
    data_explore.append(important)

df = DataFrame(data_explore)
df.columns = ['id', 'text', 'irony']


df_ironic = df[df['irony'] == 1]
df_sincere = df[df['irony'] == 0]
df_other = df[df['irony'] == -1]


data_ironic = []
for tweet in data_explore:
    if tweet[2] == 1:
        data_ironic.append(tweet)

data_sincere = []
for tweet in data_explore:
    if tweet[2] == 0:
        data_sincere.append(tweet)

data_other = []
for tweet in data_explore:
    if tweet[2] == -1:
        data_other.append(tweet)

f = open('ironic_for_node.json', 'w')
json.dump(data_ironic, f)
f.close()

g = open('sincere_for_node.json', 'w')
json.dump(data_sincere, g)
g.close()

h = open('other_for_node.json', 'w')
json.dump(data_other, h)
h.close()
