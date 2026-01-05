// src/data/modules/project_prepa.ts

export const project_prepa = [
  // ============================================================
  // PARTIE 1 : L'ARSENAL & LE PLAN (CELLULE 1)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 1 : L'Arsenal Technique & La Solution MacGyver",
    content: `
Avant de toucher aux données, nous devons préparer notre "Cuisine". Voici les ingrédients indispensables pour réussir ce projet.

**1. Les Fondations (Le Sol)**
* **Pandas** : C'est l'Excel de Python. Sans lui, on ne peut pas lire ni manipuler les tableaux de données.
* **Numpy** : La calculatrice scientifique. Elle gère les calculs matriciels complexes en arrière-plan.

**2. Les Artistes & Le Juge**
* **Seaborn / Matplotlib** : Nos pinceaux. Ils vont transformer des chiffres illisibles en graphiques clairs (Scatter plots).
* **Metrics (Silhouette)** : C'est l'arbitre impartial. Il va noter notre travail (entre -1 et 1) pour nous dire si nos clusters sont cohérents.

**3. L'Égaliseur (CRITIQUE) : StandardScaler** ⚠️
C'est l'outil le plus important.
* *Le Problème :* Si vous avez un Salaire (10,000 DH) et un Âge (30 ans), l'algorithme va penser que le Salaire est 300 fois plus important juste à cause de la grandeur du chiffre.
* *La Solution :* Le **StandardScaler** remet tout le monde sur la même échelle (entre -1 et 1). Sans lui, K-Means échoue mathématiquement.

**4. Le "MacGyver" (K-Medoids Custom)** 🛠️
Nous avons un défi technique : l'environnement JupyterLite bloque l'installation de la librairie \`scikit-learn-extra\`.
* *Notre Solution :* Nous avons codé manuellement une version simplifiée de l'algorithme (classe \`SimpleKMedoids\`) pour contourner le problème sans perdre de points.
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Importations & Classe Custom",
    globalExplanation: "🎓 **Astuce pour la Soutenance** : Si le prof demande pourquoi cette classe 'SimpleKMedoids' existe, répondez : *'Monsieur, pour garantir la portabilité du code sur tous les environnements (y compris Web), j'ai implémenté l'algorithme PAM manuellement au lieu de dépendre d'une librairie C++ externe.'*",
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score, davies_bouldin_score
from sklearn.metrics import pairwise_distances

from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN, OPTICS
from sklearn.mixture import GaussianMixture
from scipy.cluster.hierarchy import dendrogram, linkage

sns.set(style="whitegrid")
plt.rcParams['figure.figsize'] = (12, 8)

# --- SOLUTION SIMPLE POUR K-MEDOIDS (MacGyver) ---
class SimpleKMedoids:
    def __init__(self, n_clusters=5, max_iter=100, random_state=42):
        self.n_clusters = n_clusters
        self.max_iter = max_iter
        self.random_state = random_state
    
    def fit_predict(self, X):
        # 1. Fixer le hasard pour la reproductibilité
        np.random.seed(self.random_state)
        
        # 2. Choisir des points aléatoires comme "Chefs" (Medoids)
        indices = np.random.choice(X.shape[0], self.n_clusters, replace=False)
        medoids = X[indices]
        
        # 3. Calculer la distance de tout le monde vers ces chefs
        dists = pairwise_distances(X, medoids)
        
        # 4. Assigner chaque point au chef le plus proche
        labels = np.argmin(dists, axis=1) 
        return labels #[10, 2, 50, 100, 5]`,
    explanations: [
      { line: 1, text: "Pandas & Numpy : Les outils de base pour charger et manipuler les données." },
      { line: 4, text: "Seaborn : Permet de créer des graphiques esthétiques et lisibles (mieux que Matplotlib seul)." },
      { line: 6, text: "StandardScaler : INDISPENSABLE. Il normalise les données pour que l'âge ne soit pas écrasé par le revenu." },
      { line: 7, text: "Metrics : On importe 'Silhouette' et 'Davies-Bouldin' pour évaluer mathématiquement la qualité des clusters." },
      { line: 10, text: "Les Algorithmes : On charge l'arsenal complet (KMeans, DBSCAN, GMM...) pour les comparer." },
      { line: 18, text: "Class SimpleKMedoids : Notre implémentation manuelle pour remplacer la librairie manquante." },
      { line: 25, text: "np.random.seed : On fige le hasard. Important pour obtenir toujours le même résultat à chaque exécution." },
      { line: 28, text: "Initialisation : On choisit 5 points au hasard dans les données qui deviendront les centres temporaires." },
      { line: 32, text: "pairwise_distances : On mesure la distance entre chaque client et les 5 centres choisis." },
      { line: 35, text: "argmin : Chaque client rejoint le groupe du centre le plus proche (distance minimale)." }
    ]
  },// ============================================================
  // PARTIE 2 : LE CARBURANT & LE NETTOYAGE (CELLULE 2)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 2 : Chargement Hybride & Préparation",
    content: `
Maintenant que l'usine est prête (Cellule 1), il faut y faire entrer la matière première : les Données.

**1. Le Chargement "Tout-Terrain" (Hybride)** 🌐
* *Le Problème :* Ce code doit marcher partout : sur ton PC, sur Google Colab, et sur JupyterLite (Web).
* *La Solution :* On utilise un bloc de sécurité \`try / except\`. Le code essaie d'abord la méthode Web (Pyodide), et si ça échoue, il active automatiquement le "Plan B" (Pandas standard).

**2. La Sélection des Ingrédients (Features)** 🎯
Le dataset contient beaucoup d'infos (Age, Genre...), mais pour cette démo, nous voulons visualiser les résultats en **2D**.
* *Le Choix :* Nous ne gardons que **Revenu Annuel** et **Score de Dépenses**.
* *Pourquoi ?* C'est suffisant pour voir des groupes logiques (ex: "Riches qui dépensent peu") sur un simple graphique X/Y.

**3. La Transformation Mathématique (Scaling)** 📉
C'est l'étape critique pour K-Means.
* *Avant :* Revenu = 15,000 | Score = 30
* *Après :* Revenu = -1.2 | Score = -0.8
Le **StandardScaler** transforme les chiffres réels en "coordonnées abstraites" pour que l'IA ne soit pas biaisée par les grands nombres.
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Chargement & Normalisation",
    globalExplanation: "🎓 **Explication pour le Prof** : 'J'ai implémenté un chargement hybride. Le code détecte automatiquement s'il tourne sur un navigateur (JupyterLite) ou un PC local, et adapte la méthode de connexion pour éviter les erreurs.'",
    code: `# --- CELLULE 2 : CHARGEMENT & PREPARATION ---

# 1. Lien direct (GitHub) - Pas besoin de fichier local
url = "https://raw.githubusercontent.com/tirthajyoti/Machine-Learning-with-Python/master/Datasets/Mall_Customers.csv"

try:
    # Méthode A : Pour JupyterLite (Environnement Web)
    from pyodide.http import open_url
    df = pd.read_csv(open_url(url))
    print("✅ Chargé via Pyodide (Web)")
except ImportError:
    # Méthode B : Pour PC / Google Colab (Classique)
    df = pd.read_csv(url)
    print("✅ Chargé via Pandas Standard")

# 2. On garde juste : Revenu & Score (Pour voir les groupes en 2D)
X = df[['Annual Income (k$)', 'Spending Score (1-100)']].values

# 3. Normalisation (OBLIGATOIRE pour que K-Means marche bien)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print(f"✅ Données chargées : {df.shape} (200 clients)")
display(df.head())`,
    explanations: [
      { line: 4, text: "URL : On stocke le lien du fichier CSV. On utilise un lien 'Raw' (Brut) pour que Python puisse le lire directement." },
      { line: 6, text: "Try : Début du bloc de sécurité. On dit à Python : 'Essaie d'abord cette méthode spécifique au Web'." },
      { line: 8, text: "open_url : C'est la clé magique pour JupyterLite. Elle ouvre un tunnel sécurisé pour télécharger le fichier." },
      { line: 10, text: "Except ImportError : Le Plan B. Si la ligne précédente échoue (car on n'est pas sur le Web), on atterrit ici." },
      { line: 12, text: "pd.read_csv(url) : La méthode classique. Elle marche sur n'importe quel ordinateur normal." },
      { line: 16, text: "Selection : On isole les colonnes 'Revenu' et 'Score'. On ignore l'Age et le Genre pour simplifier la visualisation." },
      { line: 16, text: ".values : Très important. On convertit le tableau Pandas (Excel) en Matrice Numpy (Maths) pour l'algorithme." },
      { line: 19, text: "StandardScaler() : On initialise l'outil de mise à l'échelle (le 'Mizan')." },
      { line: 20, text: "fit_transform : L'action principale. Il calcule la moyenne, l'écart-type, et transforme toutes les données entre -1 et 1." },
      { line: 23, text: "display : On affiche les 5 premières lignes pour vérifier visuellement que les données sont propres." }
    ]
  },// ============================================================
  // PARTIE 3 : LA CHASSE AU K (CELLULE 3)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 3 : La Méthode du Coude (Elbow Method)",
    content: `
L'algorithme K-Means a un gros défaut : il est "aveugle". Il ne sait pas combien de groupes existent naturellement. C'est à **nous** de lui dire (K=3 ? K=5 ? K=10 ?).

**Comment savoir le bon nombre ?**
On utilise la **Méthode du Coude**.
1. On lance K-Means avec 1 groupe, puis 2, puis 3... jusqu'à 10.
2. À chaque fois, on calcule l'**Inertie** (la somme des distances entre les points et leur centre).
   * *Inertie Élevée* = Les points sont loin du centre (Mauvais).
   * *Inertie Faible* = Les points sont serrés (Bien).
3. On trace la courbe.
4. On cherche le **"Coude"** (le point de cassure). C'est le moment où ajouter un nouveau groupe n'améliore plus beaucoup la qualité.

*Dans notre cas (Mall Customers), le coude est généralement visible à **K=5**.*
    `
  },
  {
    type: 'interactive-code',
    title: "Code : La Boucle de Test",
    globalExplanation: "🎓 **Astuce** : L'inertie diminue toujours quand K augmente. Si K = nombre de clients, l'inertie est 0 (parfait), mais ça ne sert à rien. Le but est de trouver le compromis entre 'Faible Inertie' et 'Petit nombre de clusters'.",
    code: `# --- CELLULE 3 : METHODE DU COUDE (ELBOW) ---

inertias = []
K_range = range(1, 11)

# On teste K de 1 à 10
for k in K_range:
    # 1. Création du modèle
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    
    # 2. Entraînement sur les données normalisées
    kmeans.fit(X_scaled)
    
    # 3. Stockage de l'erreur (Inertia)
    inertias.append(kmeans.inertia_)

# Visualisation de la courbe
plt.figure(figsize=(8, 4))
plt.plot(K_range, inertias, 'bo-')
plt.xlabel('Nombre de Clusters (K)')
plt.ylabel('Inertia (Erreur)')
plt.title('Elbow Method : Cherchez le point de cassure (Coude)')
plt.show()`,
    explanations: [
      { line: 3, text: "inertias = [] : On prépare une liste vide (un sac) pour collecter les scores de chaque test." },
      { line: 4, text: "range(1, 11) : On décide de tester toutes les possibilités de 1 groupe jusqu'à 10 groupes." },
      { line: 7, text: "for k in K_range : La boucle commence. K vaudra 1, puis 2, puis 3..." },
      { line: 9, text: "KMeans(...) : On configure l'algorithme avec le 'k' actuel. n_init=10 signifie qu'il va réessayer 10 fois pour être sûr." },
      { line: 12, text: "fit(X_scaled) : L'entraînement. L'algorithme essaie de trouver les meilleurs centres pour ce nombre de groupes." },
      { line: 15, text: "kmeans.inertia_ : C'est le score d'erreur. Plus c'est bas, mieux c'est. On l'ajoute à notre liste." },
      { line: 19, text: "plt.plot : On dessine la courbe. 'bo-' signifie 'Blue' (bleu), 'o' (points ronds), '-' (ligne continue)." },
      { line: 22, text: "plt.show() : Affiche le graphique. C'est là qu'on doit regarder avec nos yeux pour trouver le coude (souvent K=5)." }
    ]
  },// ============================================================
  // PARTIE 4 : LE GRAND TOURNOI (CELLULE 4)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 4 : La Comparaison des 6 Algorithmes",
    content: `
C'est le moment de vérité. Nous avons déterminé que **K=5** est le nombre idéal (grâce au Coude). Maintenant, nous allons lancer une "Audition" avec 6 candidats différents pour voir qui sépare le mieux les clients.

**Les Candidats (Algorithmes) :**
1. **K-Means** : Le classique. Rapide et efficace, mais aime les formes rondes.
2. **K-Medoids (Custom)** : Le robuste. Moins sensible aux valeurs extrêmes (Outliers).
3. **Hierarchical** : L'organisé. Il construit un arbre de relations.
4. **DBSCAN** : Le rebelle. Il ne cherche pas de cercles, il cherche la densité. Il peut dire "Toi, tu es du bruit (bruit = -1)".
5. **GMM** : Le probabiliste. Il utilise des statistiques (Gaussiennes) pour des formes plus souples.
6. **OPTICS** : Le cousin de DBSCAN. Mieux adapté si la densité varie beaucoup.

**Le Critère de Notation : Silhouette Score** 📊
Pour chaque candidat, on calcule un score (entre -1 et 1).
* *Proche de 1* : Excellent (Groupes bien séparés).
* *Proche de 0* : Bof (Groupes qui se chevauchent).
* *Négatif* : Catastrophe (Clients mal classés).
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Exécution & Visualisation",
    globalExplanation: "🎓 **Point Fort** : Ce code est très compact. Au lieu d'écrire 6 fois la même chose, on utilise une boucle `for` et un dictionnaire. Ça montre au prof que vous savez coder proprement (DRY - Don't Repeat Yourself).",
    code: `# --- CELLULE 4 : COMPARAISON DES 6 ALGORITHMES ---

# On fixe K=5 (d'après le coude trouvé avant)
K = 5

# Liste des candidats (Dictionnaire)
algos = {
    "K-Means": KMeans(n_clusters=K, random_state=42, n_init=10),
    "K-Medoids": SimpleKMedoids(n_clusters=K, random_state=42),
    "Hierarchical": AgglomerativeClustering(n_clusters=K),
    "DBSCAN": DBSCAN(eps=0.3, min_samples=5), # Pas de K ici, c'est basé sur la densité
    "GMM": GaussianMixture(n_components=K, random_state=42),
    "OPTICS": OPTICS(min_samples=5, xi=0.05, min_cluster_size=0.1)
}

# Préparer la planche à dessin (2 lignes, 3 colonnes)
fig, axes = plt.subplots(2, 3, figsize=(18, 10))
axes = axes.flatten() # Aplatir pour accéder facilement (0, 1, 2...)

print(f"{'ALGORITHME':<15} | {'SILHOUETTE (Qualité)':<20}")
print("-" * 40)

# La Boucle Principale
for i, (name, model) in enumerate(algos.items()):
    # 1. Entraînement & Prédiction
    labels = model.fit_predict(X_scaled)
    
    # 2. Calcul du Score (Seulement si on a trouvé des clusters)
    if len(set(labels)) > 1:
        score = silhouette_score(X_scaled, labels)
        score_txt = f"Sil: {score:.2f}"
        print(f"{name:<15} | {score:.3f}")
    else:
        score_txt = "N/A" # Cas rare où tout le monde est dans le même groupe
        print(f"{name:<15} | Pas assez de clusters")

    # 3. Dessin (Scatter Plot)
    axes[i].scatter(X_scaled[:, 0], X_scaled[:, 1], c=labels, cmap='viridis', s=40)
    axes[i].set_title(f"{name} ({score_txt})")
    axes[i].set_xlabel("Revenu")
    axes[i].set_ylabel("Score")

plt.tight_layout()
plt.show()`,
    explanations: [
      { line: 4, text: "K = 5 : On applique la règle décidée à l'étape précédente." },
      { line: 7, text: "Dictionnaire algos : On range tous nos modèles dans une boîte avec des étiquettes. Notez que DBSCAN et OPTICS n'utilisent pas K, mais 'eps' (rayon)." },
      { line: 17, text: "subplots(2, 3) : On crée une grille de 6 graphiques vides pour pouvoir les comparer côte à côte." },
      { line: 24, text: "enumerate(algos.items()) : La boucle magique. Elle prend chaque algo un par un. 'i' est le numéro (0 à 5), 'name' est le nom, 'model' est l'algorithme." },
      { line: 26, text: "fit_predict : L'algo travaille. Il analyse les données et attribue une étiquette (0, 1, 2, 3, 4) à chaque client." },
      { line: 29, text: "if len > 1 : Sécurité. On ne peut pas calculer la séparation s'il n'y a qu'un seul groupe (ou que du bruit)." },
      { line: 30, text: "silhouette_score : Le Juge donne sa note." },
      { line: 37, text: "scatter : On dessine les points. 'c=labels' veut dire 'colorie chaque point selon son groupe'." },
      { line: 42, text: "tight_layout : Une petite fonction esthétique pour que les titres ne se chevauchent pas." }
    ]
  }
];