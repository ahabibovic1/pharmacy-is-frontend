import React, { Component } from 'react'

export default class Help extends Component {
    render() {
        return (
            <div style={{margin:"20px"}}>
                <h5>
                    Kreiraj narudžbu
                </h5>
                <ul>
                <li>Da bi ste dodali neki lijek u narudžbu potrebo je unijeti količinu lijeka i kliknuti na dugme "Dodaj" pored imena lijeka</li>
                <li>Lijekovi iz narudžbe se mogu otkloniti klikom na dugme "X". Količina lijeka se može promijeniti unosom nove količine. Kada želite finalizirati narudžbu potrebno je da kliknete na dugme "Potvrdi narudžbu".</li>
                </ul>
                <h5> Evidencija lijekova</h5>
                <h6>Dodavanje lijeka</h6>
                <ul>
                <li>Za dodavanje novog lijeka je potrebno da se popune polja sa odgovarajućim podacima. Polja "Naziv", "Cijena", "Opis" ne smiju ostati prazna. Nakon popunjavanja podataka potrebno je da kliknete dugme "Dodaj". Ukoliko ne želite da dodate lijek, kliknite na dugme "Poništi".</li>
                </ul>
                <h6>Pregled lijekova</h6>
                <ul>
                <li>U listi su prikazani svi lijekovi. Ukoliko tražite neki specifični lijek ili kategoriju, moguća je pretraga po imenu i kategoriji. Za prikaz samo esencijalnih lijekova potrebno je označiti kvadratić pored "Esencijalni lijek". Ukoliko želite da ažurirate informacije o lijeku, potredno je kliknuti na dugme "Ažuriraj".</li>
                <li>Unesite željene promjene lijeka u odgovarajuća polja i kada želite da sačuvate promjene kliknite na dugme "Sačuvaj". Ukoliko želite poništiti promjene kliknite na dugme "Poništi".</li>
                </ul>
                <h6>Brisanje lijekova</h6>
                <ul>
                <li>U listi su prikazani svi lijekovi. Ukoliko želite obrisati određeni lijek, potrebno je da kliknete na dugme "Obriši" pored naziva tog lijeka.</li>
                </ul>
                <h5>Prodaja</h5>
                <ul>
                    <li>
                        Šifre za lijekove koje je moguće unijet su brojevi od 1 do 13
                    </li>
                </ul>

            </div>
        )
    }
}
