import matplotlib.pyplot as plt
import networkx as nx
G  = nx.Graph()
G.add_nodes_from([("You",{"color":"red"}),("me",{"color":"green"})])
G.add_edge("You","me")
G.add_edges_from([(1, 2), (1, 3)])
G.add_node(1)
G.add_edge(1, 2)
G.add_node("spam")        # adds node "spam"
G.add_nodes_from("spam")  # adds 4 nodes: 's', 'p', 'a', 'm'
G.add_edge(3, 'm')
print(G.number_of_nodes()," ' ",G.number_of_edges())
print(list(G.nodes))
print(list(G.edges))
print(list(G.adj["You"]),list(G.neighbors(1)),G.degree[1])
print(G.edges([2, 'm']))
H = nx.DiGraph(G)
print(list(H.edges))
# A = nx.petersen_graph()
# subax1 = plt.subplot(131)
# nx.draw(A, with_labels=True, font_weight='bold')
# subax2 = plt.subplot(132)
# nx.draw_shell(A, nlist=[range(5, 10), range(5)], with_labels=True, font_weight='bold')
# subax3 = plt.subplot(133)
nx.draw(G, with_labels =True)
plt.show()
options = {
    'node_color': 'black',
    'node_size': 100,
    'width': 3,
}
subax1 = plt.subplot(221)
nx.draw_random(G, **options)
subax2 = plt.subplot(222)
nx.draw_circular(G, **options)
subax3 = plt.subplot(223)
nx.draw_spectral(G, **options)
subax4 = plt.subplot(224)
nx.draw_shell(G, nlist=[range(5,10), range(5)], **options)