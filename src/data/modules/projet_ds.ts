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
  },
  ];