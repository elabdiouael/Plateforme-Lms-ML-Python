// src/data/modules/project_prepa.ts

export const project_prepa = [
    // ============================================================
    // PARTIE 1 : SETUP & DATA GENERATION
    // ============================================================
    {
      type: 'theory',
      title: "Phase 1 : L'Atelier & La Matière Première",
      content: `
  Avant de lancer l'Intelligence Artificielle, on doit préparer le terrain.
  
  1.  **L'Atelier (Imports)** : On sort nos outils de la boîte.
      * **Pandas** : Pour manipuler les tableaux (Excel de Python).
      * **Numpy** : Pour les maths et la génération de nombres.
      * **Sklearn** : Le cerveau de l'IA.
      * **Seaborn/Matplotlib** : Les outils de dessin (Graphes).
  
  2.  **La Matière (Data)** : Comme on n'a pas de vrais clients sous la main, on va les **simuler**.
      * On ne va pas mettre des chiffres au hasard complet.
      * On va utiliser des "Distributions Normales" (Courbe en cloche) pour rendre ça réaliste.
      `
    },
    {
      type: 'interactive-code',
      title: "Génération du Dataset",
      globalExplanation: "Ce script est un 'Simulateur de Réalité'. On ne crée pas juste des données aléatoires, on sculpte des profils précis (des groupes cachés). On utilise 'np.concatenate' pour coller ensemble des groupes de pauvres, de riches, de dépensiers, etc., afin de voir si l'IA pourra les retrouver plus tard.",
      code: `%pip install seaborn scikit-learn
  import pandas as pd
  import numpy as np
  import matplotlib.pyplot as plt
  import seaborn as sns
  from sklearn.cluster import KMeans
  from sklearn.preprocessing import StandardScaler
  from sklearn.metrics import silhouette_score
  
  # Création du Dictionnaire de Données
  data = {
      'CustomerID': range(1, 201),
      'Gender': np.random.choice(['Male', 'Female'], 200),
      'Age': np.random.randint(18, 70, 200),
      
      # Revenu Annuel (k$) : On mélange plusieurs groupes
      'Annual Income (k$)': np.concatenate([
          np.random.normal(20, 5, 40),  # Revenu Faible
          np.random.normal(50, 10, 80), # Revenu Moyen
          np.random.normal(90, 10, 40), # Revenu Élevé
          np.random.normal(20, 5, 20),  # Revenu Faible (Piège)
          np.random.normal(90, 10, 20)  # Revenu Élevé (Piège)
      ]),
      
      # Score de Dépense (1-100)
      'Spending Score (1-100)': np.concatenate([
          np.random.normal(20, 10, 40), # Économe
          np.random.normal(50, 10, 80), # Modéré
          np.random.normal(20, 10, 40), # Économe
          np.random.normal(80, 10, 20), # Dépensier
          np.random.normal(80, 10, 20)  # Dépensier
      ])
  }
  
  df = pd.DataFrame(data)
  
  # Nettoyage et Validation
  df['Spending Score (1-100)'] = df['Spending Score (1-100)'].clip(1, 100)
  df['Annual Income (k$)'] = df['Annual Income (k$)'].abs()
  
  df.to_csv('Mall_Customers.csv', index=False)
  display(df.head())`,
      explanations: [
        { line: 1, text: "Installation : Commande magique pour installer les librairies manquantes dans l'environnement Jupyter." },
        { line: 2, text: "Imports : On charge Pandas (pd) pour les tables et Numpy (np) pour les calculs." },
        { line: 6, text: "Sklearn : On importe KMeans (l'algorithme) et StandardScaler (le normalisateur). C'est le cœur du projet." },
        { line: 12, text: "range(1, 201) : Crée une liste de nombres de 1 à 200 pour identifier les clients." },
        { line: 16, text: "np.concatenate : C'est comme de la colle. On fabrique 5 petits groupes de revenus différents et on les colle pour faire une seule longue liste." },
        { line: 17, text: "np.random.normal(20, 5, 40) : Génère 40 personnes avec un revenu moyen de 20k, mais qui varie un peu (±5k). Ça imite la réalité." },
        { line: 35, text: "pd.DataFrame(data) : Transforme notre dictionnaire (JSON) en un vrai tableau Excel manipulable." },
        { line: 38, text: ".clip(1, 100) : Règle Business. Un score ne peut pas dépasser 100 ni être sous 1. On coupe ce qui dépasse." },
        { line: 39, text: ".abs() : Sécurité. Si 'random.normal' a généré un revenu négatif par hasard, on le rend positif." },
        { line: 41, text: "to_csv : On sauvegarde le résultat dans un fichier physique pour pouvoir le réutiliser ou l'envoyer." }
      ]
    }
    ,// ============================================================
  // PARTIE 2 : PREPROCESSING (SCALING)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 2 : La Mise à Niveau (Scaling)",
    content: `
**Le Problème Invisible :**
L'algorithme K-Means calcule la "distance" entre les clients.
- Le Revenu est en milliers (ex: 50 000 $).
- Le Score est petit (ex: 50 points).

Sans correction, l'IA va penser que le **Revenu est 1000 fois plus important** que le Score, juste parce que le chiffre est plus grand.

**La Solution : StandardScaler**
On écrase les unités (Dollars et Points). On ramène tout le monde sur une échelle commune (centrée autour de 0).
    `
  },
  {
    type: 'interactive-code',
    title: "Standardisation des Données",
    globalExplanation: "C'est l'étape critique. On utilise 'iloc' pour chirurgicalement extraire les colonnes qui nous intéressent, puis on applique le 'StandardScaler' pour mettre le Revenu et le Score sur un pied d'égalité. Si tu oublies ça, ton Clustering sera faux.",
    code: `# On a besoin de l'outil de mise à l'échelle
from sklearn.preprocessing import StandardScaler

# 1. Sélection Chirurgicale des Données
# On ne garde que les colonnes utiles pour le clustering
# df.iloc[lignes, colonnes]
X = df.iloc[:, [3, 4]].values

# 2. Chargement de l'Outil (Le "Mizan")
scaler = StandardScaler()

# 3. Application de la Transformation Mathématique
# fit : Calcule la Moyenne et l'Écart-type
# transform : Applique la formule (x - moyenne) / écart-type
X_scaled = scaler.fit_transform(X)

# Vérification (Aperçu des 3 premières lignes)
print("--- Avant Scaling (Dollars & Points) ---")
print(X[:3]) 

print("\\n--- Après Scaling (Mathématiques Pures) ---")
print(X_scaled[:3])`,
    explanations: [
      { line: 2, text: "Importation : On charge l'outil StandardScaler depuis la bibliothèque Scikit-Learn." },
      { line: 7, text: "Slicing ([ : , [3, 4] ]) : Le ':' signifie 'Toutes les lignes'. Le '[3, 4]' signifie 'Colonnes 3 et 4 uniquement' (Revenu et Score)." },
      { line: 7, text: ".values : Très important. On convertit le Tableau Pandas (Excel) en Matrice Numpy (Nombres purs) pour que l'IA puisse calculer." },
      { line: 10, text: "Initialisation : On crée une instance vide du Scaler. Il est prêt mais ne connaît pas encore nos données." },
      { line: 15, text: "fit_transform() : L'étape magique. 1) Il apprend la distribution des données (Moyenne). 2) Il transforme chaque nombre pour le normaliser." },
      { line: 19, text: "Print X : Affiche les données brutes (ex: 50000, 80). C'est lisible pour l'humain mais mauvais pour K-Means." },
      { line: 22, text: "Print X_scaled : Affiche les données transformées (ex: 1.2, -0.5). Illisible pour l'humain, mais parfait pour l'IA." }
    ]
  }, // ============================================================
  // PARTIE 3 : ELBOW METHOD (CHOIX DU K)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 3 : La Méthode du Coude (Elbow)",
    content: `
**Le Dilemme :**
Combien de profils clients existent réellement ? 3 ? 5 ? 10 ?
L'algorithme K-Means est "aveugle", il ne peut pas deviner ce nombre tout seul. C'est à nous de lui fournir le paramètre **K** (nombre de clusters).

**La Stratégie (Test Itératif) :**
Nous allons lancer l'IA **10 fois de suite** dans une boucle :
- Essai 1 : "Divise en 1 groupe" -> On mesure l'erreur.
- Essai 2 : "Divise en 2 groupes" -> On mesure l'erreur.
- ...
- Essai 10 : "Divise en 10 groupes" -> On mesure l'erreur.

**L'Objectif :**
On cherche le **"Coude"** sur le graphique : le moment précis où ajouter un groupe supplémentaire ne réduit plus significativement l'erreur.
    `
  },
  {
    type: 'interactive-code',
    title: "Recherche du K Optimal",
    globalExplanation: "Dans cette cellule, on automatise les tests. On crée une liste vide 'wcss' pour noter les scores. Ensuite, on lance une boucle de 1 à 10. Pour chaque tour, on configure, on entraîne et on note le score. C'est une approche 'Brute Force' intelligente.",
    code: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Liste vide pour stocker l'inertie (le score d'erreur)
wcss = [] 

# On teste des hypothèses allant de 1 à 10 clusters
k_range = range(1, 11)

for i in k_range:
    # 1. Configuration du modèle pour ce test
    # n_clusters : Combien de groupes on veut ?
    # init : Comment placer les points de départ ?
    # random_state : Pour avoir toujours le même résultat
    kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
    
    # 2. Entraînement sur les données NORMALISÉES
    kmeans.fit(X_scaled)
    
    # 3. Récupération et stockage du score (Inertia)
    wcss.append(kmeans.inertia_)

# Visualisation des résultats
plt.figure(figsize=(10,5))
plt.plot(k_range, wcss, marker='o', color='red')
plt.title('Méthode du Coude (Elbow Method)')
plt.xlabel('Nombre de Clusters (K)')
plt.ylabel('Inertie (WCSS)')
plt.grid(True)
plt.show()`,
    explanations: [
      { line: 5, text: "WCSS (Within-Cluster Sum of Squares) : C'est notre indicateur d'erreur. Plus ce chiffre est bas, plus les groupes sont compacts et cohérents." },
      { line: 8, text: "Boucle for : La variable 'i' va prendre successivement les valeurs 1, 2, 3... jusqu'à 10." },
      { line: 14, text: "n_clusters=i : L'objectif du test (ex: 'Trouve-moi 3 groupes').\ninit='k-means++' : Place les centres initiaux intelligemment (éloignés les uns des autres) pour accélérer le calcul.\nrandom_state=42 : Fige le hasard. Garantit que si on relance le code demain, on aura exactement le même résultat." },
      { line: 17, text: "fit(X_scaled) : L'étape d'apprentissage. L'IA déplace les centres pour minimiser les distances. Attention : on utilise toujours les données scalées (X_scaled)." },
      { line: 20, text: ".inertia_ : Le score final de l'essai (Somme des distances au carré). On l'ajoute à notre liste pour tracer le graphique." },
      { line: 24, text: "plt.plot : On dessine la courbe. On cherchera visuellement la cassure (le coude) qui indique le meilleur compromis." }
    ]
  },// ============================================================
  // PARTIE 4 : TRAINING FINAL & VISUALISATION
  // ============================================================
  {
    type: 'theory',
    title: "Phase 4 : Le Verdict & La Visualisation",
    content: `
**La Décision :**
Le graphique précédent (Elbow) nous a montré une cassure nette à **K=5**.
C'est donc notre chiffre magique. Nous allons dire à l'IA : "Classe ces clients en 5 groupes distincts".

**La Preuve Visuelle :**
Les chiffres ne suffisent pas. Pour convaincre une équipe Marketing, il faut un graphique.
Nous allons dessiner chaque client sur un plan 2D :
- **Axe X** : Revenu
- **Axe Y** : Score de Dépense
- **Couleur** : Le Groupe (Cluster) auquel il appartient.
    `
  },
  {
    type: 'interactive-code',
    title: "Segmentation Finale",
    globalExplanation: "C'est l'étape finale. On fixe K=5, on entraîne le modèle définitif et on récupère les étiquettes (0, 1, 2, 3, 4) pour chaque client. Ensuite, on utilise Matplotlib pour générer une carte visuelle des profils. Les étoiles jaunes représenteront les 'Centres de Gravité' de chaque groupe.",
    code: `# 1. Configuration Finale (K=5 selon le Coude)
k_optimal = 5
model = KMeans(n_clusters=k_optimal, init='k-means++', random_state=42)

# 2. Prédiction des Groupes (Étiquetage)
# y_kmeans contiendra le numéro du groupe (0, 1, 2, 3, 4) pour chaque client
y_kmeans = model.fit_predict(X_scaled)

# 3. Validation Mathématique (Silhouette Score)
score = silhouette_score(X_scaled, y_kmeans)
print(f"Silhouette Score : {score:.2f}")

# 4. Visualisation (La Preuve)
plt.figure(figsize=(12, 8))

# On dessine chaque groupe avec une couleur différente
# Syntaxe : X_scaled[Filtre des lignes, Numéro de Colonne]
plt.scatter(X_scaled[y_kmeans == 0, 0], X_scaled[y_kmeans == 0, 1], s=80, c='red', label='Groupe 1')
plt.scatter(X_scaled[y_kmeans == 1, 0], X_scaled[y_kmeans == 1, 1], s=80, c='blue', label='Groupe 2')
plt.scatter(X_scaled[y_kmeans == 2, 0], X_scaled[y_kmeans == 2, 1], s=80, c='green', label='Groupe 3')
plt.scatter(X_scaled[y_kmeans == 3, 0], X_scaled[y_kmeans == 3, 1], s=80, c='cyan', label='Groupe 4')
plt.scatter(X_scaled[y_kmeans == 4, 0], X_scaled[y_kmeans == 4, 1], s=80, c='magenta', label='Groupe 5')

# Les Centres (Étoiles Jaunes)
plt.scatter(model.cluster_centers_[:, 0], model.cluster_centers_[:, 1], 
            s=300, c='yellow', marker='*', edgecolors='black', label='Centres')

plt.title('Segmentation des Clients')
plt.legend()
plt.show()`,
    explanations: [
      { line: 3, text: "KMeans(...) : On crée le modèle final figé avec 5 clusters. On garde random_state=42 pour que les couleurs ne changent pas d'un test à l'autre." },
      { line: 7, text: "fit_predict() : L'IA fait deux choses en même temps : 1) Elle apprend les centres. 2) Elle attribue une étiquette à chaque client." },
      { line: 10, text: "silhouette_score : Une note sur 1 (ex: 0.55). Plus c'est haut, plus les groupes sont bien séparés et distincts." },
      { line: 17, text: "X_scaled[y_kmeans == 0, 0] : C'est un filtre puissant.\n'y_kmeans == 0' : Prend les clients du Groupe 0.\n', 0' : Prend leur Revenu (Colonne 0)." },
      { line: 17, text: "s=80, c='red' : On dessine des points de taille 80 en rouge." },
      { line: 24, text: "model.cluster_centers_ : Ce sont les coordonnées exactes des 'Chefs de Groupe'. On les affiche en étoiles jaunes (*) pour voir le centre de gravité." }
    ]
  }

  ];
  