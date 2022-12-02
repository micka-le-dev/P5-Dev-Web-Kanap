# logique page produit

1) charger détail du produit
2) charger panier dans localStorage
3) voir si le produit est dans le panier
    - oui, présélection de
        - couleur
        - quantité
4) créer un objet DetailProductComponent avec
    - élément HTML avec le détail du produit
    - status-btn ( ajout supprime )
5) créer l'élément HTML avec le détail
6) addEventListener sur #colors
    - si couleur n'est pas séléctionnée,
        - input quantité désactivé
        - btn #addToCart avec le texte "Aucun article séléctionné"
    - si selection d'une couleur
        - activé input quantité
        - mettre la bonne valeur dans input quantité
            - déclanche un évènement
        - btn #addToCart avec le texte "Ajouter au panier"
7) addEventListener sur input #quantity
    - si quantité >= 1
        - btn -> "Ajouter au panier"