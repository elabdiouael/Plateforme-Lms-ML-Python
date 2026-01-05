// src/data/modules/projet_ds.ts

export const project_ds = [
    // --- TEMPLATE VIDE (Ghir bach ma y-crashich l-code) ---
   // ============================================================
  // NOTEBOOK 2 : ONLINE RETAIL - PARTIE 1 (CELLULE 1)
  // ============================================================
  {
    type: 'theory',
    title: "Notebook 2 - Phase 1 : L'Arsenal Business & Le Temps",
    content: `
Nous passons maintenant au "Vrai Monde" (Business). Ici, on ne joue plus avec des formes géométriques, on analyse des comportements d'achat.

**La Grande Nouveauté : Le Temps (Datetime)** 🕒
Dans le premier notebook, l'âge ou le revenu étaient des chiffres fixes.
Ici, nous devons calculer la **Récence** (Combien de jours se sont écoulés depuis le dernier achat ?).
* *Problème :* L'ordinateur voit une date ("2011-12-09") comme du texte. Il ne sait pas faire de soustraction.
* *Solution :* La bibliothèque **\`datetime\`**. Elle transforme le texte en "Objet Temps" pour faire des maths avec les dates.

**Pourquoi seulement K-Means ?**
Pour le Business, on veut des groupes simples et actionnables (ex: "Clients Or", "Clients Argent", "Clients Bronze").
K-Means est parfait pour ça. Pas besoin de la complexité de DBSCAN ici.
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Imports & Gestion du Temps",
    globalExplanation: "🎓 **Point Clé** : Si on vous demande pourquoi vous n'avez pas importé les 6 algorithmes ici, répondez : *'Pour la segmentation RFM, nous cherchons des partitions claires et interprétables (Low/Mid/High Value). K-Means est le standard industriel pour ce type de tâche.'*",
    code: `# --- CELLULE 1 : IMPORTS ---
import pandas as pd
import numpy as np
import datetime as dt # <--- L'élément crucial pour le RFM
import matplotlib.pyplot as plt
import seaborn as sns

# Machine Learning
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Config Graphique
sns.set(style="whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)

print("✅ Bibliothèques chargées.")`,
    explanations: [
      { line: 3, text: "import datetime as dt : C'est 'l'Horloge' de Python. Indispensable pour calculer la variable 'Récence' (Date d'aujourd'hui - Date d'achat)." },
      { line: 7, text: "StandardScaler : Toujours obligatoire. Le 'Montant' (ex: 5000€) est beaucoup plus grand que la 'Fréquence' (ex: 10 achats). Il faut les mettre à niveau." },
      { line: 8, text: "KMeans : On choisit l'algorithme le plus efficace pour créer des segments de clientèle distincts (Gold, Silver, Bronze)." },
      { line: 11, text: "sns.set : On configure le style des graphiques pour qu'ils soient propres et lisibles dans le rapport." }
    ]
  },// ============================================================
  // PARTIE 2 : LE NETTOYAGE INTELLIGENT (CELLULE 2)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 2 : Chargement & Nettoyage 'Blindé'",
    content: `
Les données réelles sont souvent "sales". Ici, on applique un nettoyage de niveau professionnel.

**1. Le Chargement Hybride (Encore)** 🌐
Comme pour le premier notebook, on utilise la technique \`try/except\` pour que le code marche sur le Web (JupyterLite) et sur PC sans rien toucher.

**2. Le "Smart Fix" des Colonnes** 🧠
C'est l'astuce du chef.
* *Problème :* Dans le fichier CSV, la colonne ID s'appelle parfois "Customer ID", parfois "CustomerID", parfois avec des espaces invisibles. Si on se trompe, le code plante.
* *Solution :* On a écrit un petit script qui cherche automatiquement la colonne qui contient "Customer" et "ID", et la renomme proprement. C'est du code **Robuste**.

**3. Le Grand Ménage** 🧹
* **Suppression des Fantômes** : On vire les lignes sans ID Client (on ne peut pas profiler des inconnus).
* **Suppression des Retours** : On enlève les quantités négatives (les remboursements faussent le calcul du chiffre d'affaires).
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Chargement & Smart Cleaning",
    globalExplanation: "🎓 **Point Fort** : Ce code démontre une capacité à gérer les exceptions et les erreurs de formatage de données, ce qui est très apprécié en entreprise.",
    code: `# --- CELLULE 2 : CHARGEMENT & NETTOYAGE (VERSION BLINDÉE) ---

# Lien stable (Pandas Exercises Repo)
url_retail = "https://raw.githubusercontent.com/guipsamora/pandas_exercises/master/07_Visualization/Online_Retail/Online_Retail.csv"

print("Chargement en cours...")
try:
    from pyodide.http import open_url
    # On lit 5000 lignes pour ne pas surcharger le navigateur
    df = pd.read_csv(open_url(url_retail), nrows=5000, encoding="ISO-8859-1")
except ImportError:
    df = pd.read_csv(url_retail, nrows=5000, encoding="ISO-8859-1")

# --- FIX INTELLIGENT DES COLONNES ---
# 1. On nettoie les espaces invisibles dans les noms de colonnes
df.columns = df.columns.str.strip()

# 2. Renommage dynamique (Cherche 'Customer' et 'ID')
col_id = [c for c in df.columns if 'Customer' in c and 'ID' in c]
if len(col_id) > 0:
    df.rename(columns={col_id[0]: 'CustomerID'}, inplace=True)

# --- NETTOYAGE DES DONNÉES ---
if 'CustomerID' in df.columns:
    # On enlève les lignes vides
    df = df.dropna(subset=['CustomerID'])
    # On garde uniquement les achats (Quantité > 0)
    df = df[df['Quantity'] > 0]
    print(f"✅ Données prêtes : {df.shape[0]} transactions.")
    display(df.head())
else:
    print("❌ Erreur : Colonne ID introuvable.")`,
    explanations: [
      { line: 9, text: "nrows=5000 : On charge seulement un échantillon. Charger 500,000 lignes ferait planter le navigateur." },
      { line: 9, text: "encoding='ISO-8859-1' : Le fichier contient des caractères spéciaux (£, accents). Cet encodage permet de les lire correctement." },
      { line: 14, text: "str.strip() : Enlève les espaces au début et à la fin des noms de colonnes (ex: ' Name ' devient 'Name')." },
      { line: 17, text: "List Comprehension : Une boucle compacte qui scanne toutes les colonnes pour trouver celle qui ressemble à un ID Client." },
      { line: 24, text: "dropna : Supprime les lignes où l'ID est manquant (NaN)." },
      { line: 26, text: "df['Quantity'] > 0 : Filtre pour exclure les retours produits (qui ont des quantités négatives)." }
    ]
  },// ============================================================
  // PARTIE 3 : LE MOTEUR RFM (CELLULE 3)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 3 : La Transformation RFM (Le Cœur du Réacteur)",
    content: `
Ici, on fait de la magie. On transforme une liste de factures en **Profils Clients**.
C'est le passage du niveau "Transaction" (1 ligne = 1 produit acheté) au niveau "Client" (1 ligne = 1 personne).

**La Formule Secrète : RFM**
Les entreprises comme Amazon ou Jumia utilisent ça pour te classer :
* **R - Recency (Récence)** : *Quand as-tu acheté pour la dernière fois ?*
    * (Hier = Client Actif / Il y a un an = Client Perdu).
* **F - Frequency (Fréquence)** : *Combien de fois es-tu venu ?*
    * (1 fois = Touriste / 50 fois = Habitué).
* **M - Monetary (Montant)** : *Combien as-tu dépensé au total ?*
    * (C'est le chiffre d'affaires que tu rapportes).

**Le Concept de la "Snapshot Date" (Machine à remonter le temps)** ⏳
Le dataset date de 2011. Si on calcule la récence par rapport à aujourd'hui (2026), tout le monde aura "15 ans" de récence.
* *L'Astuce :* On fixe la "Date d'aujourd'hui" fictive au lendemain de la dernière vente du fichier. On fait semblant d'être en 2011.
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Calcul & Agrégation",
    globalExplanation: "🎓 **Question Prof** : 'Pourquoi avez-vous créé une snapshot_date ?' \n**Réponse** : 'Pour simuler une analyse en temps réel à l'époque des données. On se place le jour suivant la dernière transaction pour calculer la récence de manière cohérente.'",
    code: `# --- CELLULE 3 : CALCUL RFM (Feature Engineering) ---

# 1. Conversion de la date (Pour que Python comprenne que c'est du temps)
df['InvoiceDate'] = pd.to_datetime(df['InvoiceDate'])

# 2. Création de la colonne Montant (Prix * Quantité)
# On doit calculer ça AVANT de grouper par client
df['TotalAmount'] = df['Quantity'] * df['UnitPrice']

# 3. Date de référence (Le lendemain de la dernière commande du dataset)
snapshot_date = df['InvoiceDate'].max() + dt.timedelta(days=1)

# 4. Agrégation par Client (Le Pivot)
rfm = df.groupby('CustomerID').agg({
    'InvoiceDate': lambda x: (snapshot_date - x.max()).days, # Recency
    'InvoiceNo': 'count',                                   # Frequency
    'TotalAmount': 'sum'                                    # Monetary
})

# Renommer les colonnes pour faire propre
rfm.rename(columns={'InvoiceDate': 'Recency',
                    'InvoiceNo': 'Frequency',
                    'TotalAmount': 'Monetary'}, inplace=True)

print("✅ Table RFM créée avec succès !")
display(rfm.head())`,
    explanations: [
      { line: 4, text: "pd.to_datetime : Transforme le texte '01/12/2010' en objet Date manipulable (pour faire des soustractions)." },
      { line: 8, text: "TotalAmount : On calcule le prix total de chaque ligne (ex: 5 stylos à 2€ = 10€)." },
      { line: 11, text: "snapshot_date : On prend la date max du fichier et on ajoute 1 jour. C'est notre point de référence." },
      { line: 14, text: "groupby('CustomerID') : On rassemble toutes les factures d'un même client dans un seul dossier." },
      { line: 15, text: "lambda x : Une petite fonction magique. Elle calcule : (Date Référence - Date Dernière Commande) = Nombre de jours." },
      { line: 16, text: "'count' : Compte combien de factures ce client a générées." },
      { line: 17, text: "'sum' : Additionne tout l'argent dépensé par ce client." },
      { line: 21, text: "rename : On donne les noms officiels (Recency, Frequency, Monetary) aux colonnes calculées." }
    ]
  },// ============================================================
  // PARTIE 4 : LE CLUSTERING BUSINESS (CELLULE 4)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 4 : La Segmentation (Le Podium)",
    content: `
Nous avons nos scores RFM. Maintenant, nous allons demander à l'IA de regrouper les clients qui se ressemblent.

**Pourquoi K=3 ? (La Logique Business)**
Contrairement au premier notebook où on cherchait un "Coude" mathématique, ici on applique une logique commerciale simple :
1.  **Les VIP (Gold)** : Dépensent beaucoup et viennent souvent.
2.  **Les Fidèles (Silver)** : Clients réguliers, panier moyen.
3.  **Les Occasionnels / À Risque (Bronze)** : Viennent rarement ou dépensent peu.

**Le Piège Mortel : L'Échelle (Encore !)** ⚠️
Regardez vos données :
*   *Monetary* : Peut monter jusqu'à **10,000 £**.
*   *Frequency* : Souvent autour de **1 ou 2**.
Si on ne normalise pas (**StandardScaler**), K-Means va ignorer la Fréquence et ne regarder que l'Argent. Ce serait une grave erreur d'analyse.
    `
  },
  {
    type: 'interactive-code',
    title: "Code : K-Means sur RFM",
    globalExplanation: "🎓 **Astuce** : Ici, on ne cherche pas la perfection mathématique (Silhouette Score), mais l'utilité business. 3 groupes, c'est facile à gérer pour une équipe marketing (3 campagnes d'emails différentes).",
    code: `# --- CELLULE 4 : CLUSTERING K-MEANS ---

# 1. Normalisation (OBLIGATOIRE)
# On crée un "Mizan" spécifique pour les données RFM
scaler_rfm = StandardScaler()
rfm_scaled = scaler_rfm.fit_transform(rfm)

# 2. Application de K-Means
# On choisit K=3 pour créer 3 segments clairs (Bronze, Silver, Gold)
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)

# On lance l'algo et on stocke le résultat directement dans le tableau
rfm['Cluster'] = kmeans.fit_predict(rfm_scaled)

# 3. Vérification de la taille des groupes
print("Répartition des clients par Cluster :")
print(rfm['Cluster'].value_counts())`,
    explanations: [
      { line: 5, text: "StandardScaler : Indispensable. Il met la Récence (Jours), la Fréquence (Nombre) et le Montant (£) sur un pied d'égalité." },
      { line: 9, text: "n_clusters=3 : On force 3 groupes. C'est un choix 'Métier' (Business Decision) et non un choix mathématique." },
      { line: 12, text: "rfm['Cluster'] : On crée une nouvelle colonne dans notre tableau. Chaque client reçoit son badge (0, 1 ou 2)." },
      { line: 16, text: "value_counts() : On vérifie si les groupes sont équilibrés. Si un groupe a 99% des clients, le clustering est raté." }
    ]
  },// ============================================================
  // PARTIE 5 : LE VERDICT BUSINESS (CELLULE 5)
  // ============================================================
  {
    type: 'theory',
    title: "Phase 5 : Visualisation & Profilage (Qui est Qui ?)",
    content: `
C'est l'heure de vérité. Nous avons 3 groupes (0, 1, 2), mais nous ne savons pas encore qui ils sont.
Est-ce que le Groupe 0 c'est les Riches ? Ou les Perdus ?

**L'Enquête (Profilage)** 🕵️‍♂️
Pour le savoir, on calcule la **Moyenne** de chaque groupe. C'est comme regarder la "Carte d'Identité" moyenne du segment.
*   *Exemple :* Si le Groupe 1 a une dépense moyenne de **5000 £**, alors c'est le groupe **VIP**.
*   *Exemple :* Si le Groupe 2 a une Récence moyenne de **300 jours**, alors c'est le groupe **Churn (Perdus)**.

**La Visualisation (La Preuve)** 📉
On dessine un graphique (Scatter Plot) :
*   **Axe X (Récence)** : Le temps. Plus on va à droite, plus ça fait longtemps qu'ils n'ont pas acheté.
*   **Axe Y (Montant)** : L'argent. Plus on monte, plus ils sont riches.
    `
  },
  {
    type: 'interactive-code',
    title: "Code : Le Tableau de Bord Final",
    globalExplanation: "🎓 **Le Graal** : Ce tableau des moyennes est ce que le Directeur Marketing attend. C'est la base pour dire : 'Envoyez un code promo au Groupe 2' ou 'Appelez le Groupe 0 pour les remercier'.",
    code: `# --- CELLULE 5 : VISUALISATION & ANALYSE ---

# 1. Scatter Plot (Récence vs Montant)
plt.figure(figsize=(10, 6))
sns.scatterplot(data=rfm, x='Recency', y='Monetary', hue='Cluster', palette='viridis', s=80)
plt.title("Segmentation Clients : Qui sont nos VIP ?")
plt.xlabel("Récence (Jours depuis dernier achat)")
plt.ylabel("Montant Total (£)")
plt.legend(title='Groupe')
plt.show()

# 2. Tableau des Moyennes (La Carte d'Identité)
print("\n--- ANALYSE DES PROFILS (MOYENNES) ---")
# On groupe par Cluster et on fait la moyenne pour voir les stats
summary = rfm.groupby('Cluster').mean().round(2)
display(summary)

# 3. Aide à l'interprétation (Guide de lecture)
print("\n--- COMMENT LIRE CE TABLEAU ? ---")
print("👉 Cherchez le Montant le plus haut : C'est vos VIP (Gold).")
print("👉 Cherchez la Récence la plus haute : C'est vos Clients à Risque (Churn).")
print("👉 Le reste : C'est vos Clients Standard (Silver).")`,
    explanations: [
      { line: 4, text: "sns.scatterplot : On dessine les points. 'hue=Cluster' signifie 'Change de couleur selon le groupe'." },
      { line: 5, text: "Titre & Labels : Toujours mettre des titres clairs. Un graphique sans titre ne vaut rien dans un rapport." },
      { line: 13, text: "groupby('Cluster').mean() : C'est la ligne la plus importante. Elle calcule le 'Profil Type' de chaque groupe." },
      { line: 14, text: "display(summary) : Affiche le tableau. C'est ici que vous verrez par exemple : Cluster 0 = 500£, Cluster 1 = 5000£." },
      { line: 17, text: "Print : On ajoute du texte pour aider le lecteur (et le prof) à comprendre immédiatement l'analyse." }
    ]
  }

  ];