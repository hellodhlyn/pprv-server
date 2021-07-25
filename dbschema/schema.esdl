using extension graphql;

module default {
    type AuditableEntity {
        required property created_at -> datetime {
            default := datetime_current();
        };
        required property updated_at -> datetime {
            default := datetime_current();
        };
    }

    type ProductCategory extending AuditableEntity {
        required property slug -> str { constraint exclusive; };
        required property name -> str { constraint exclusive; };
    }

    type ProductBrand extending AuditableEntity {
        required property slug -> str { constraint exclusive; };
        required property name -> str { constraint exclusive; };
    }

    type Product extending AuditableEntity {
        required property slug -> str { constraint exclusive; };
        required property name -> str { constraint exclusive; };
        property description -> str;
        property release_at -> datetime;
        link category -> ProductCategory;
        link brand -> ProductBrand;
        multi link rumors -> Rumor;
    }

    type Rumor extending AuditableEntity {
        required property headline -> str;
        required property body -> str;
        required property date -> cal::local_date;
        property source -> str;
        property source_url -> str;
    }
}
